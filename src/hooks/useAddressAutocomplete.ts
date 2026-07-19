import { useEffect, useRef } from 'react';

/**
 * Address autocomplete on a plain <input>, backed by the Places API (New).
 *
 * The legacy `google.maps.places.Autocomplete` widget is unavailable to
 * Google Cloud projects created after March 2025 (it returns REQUEST_DENIED),
 * so this hook drives `AutocompleteSuggestion.fetchAutocompleteSuggestions`
 * directly and renders its own dropdown styled to match the site. If the API
 * fails for any reason (key restrictions, API not enabled, network), the
 * input silently keeps working as a normal text field.
 */

// --- Minimal types for the pieces of the new Places library we use ---------

interface AddressComponent {
  types: string[];
  longText: string | null;
}

interface PlaceLike {
  fetchFields(opts: { fields: string[] }): Promise<unknown>;
  formattedAddress: string | null;
  addressComponents: AddressComponent[] | null;
}

interface PlacePrediction {
  text: { text: string };
  toPlace(): PlaceLike;
}

interface SuggestionsResponse {
  suggestions: { placePrediction: PlacePrediction | null }[];
}

interface PlacesLibrary {
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions(request: {
      input: string;
      includedRegionCodes?: string[];
      sessionToken?: object;
    }): Promise<SuggestionsResponse>;
  };
  AutocompleteSessionToken: new () => object;
}

declare global {
  interface Window {
    google?: {
      maps?: {
        importLibrary?: (name: string) => Promise<unknown>;
        places?: unknown;
      };
    };
  }
}

// --- Script loading (shared across all instances of the hook) --------------

let scriptLoading = false;
let scriptLoaded = false;
const loadCallbacks: (() => void)[] = [];

function onMapsReady() {
  scriptLoaded = true;
  scriptLoading = false;
  loadCallbacks.forEach((cb) => cb());
  loadCallbacks.length = 0;
}

function loadGoogleMapsScript() {
  if (scriptLoaded || scriptLoading) return;

  // Already bootstrapped (e.g. by an earlier page in this session).
  const importLibrary = window.google?.maps?.importLibrary;
  if (typeof importLibrary === 'function') {
    onMapsReady();
    return;
  }

  // A Maps script tag may already exist in the document — loading the API a
  // second time makes Google reject the page outright ("You have included the
  // Google Maps JavaScript API multiple times"), which breaks autocomplete.
  // Wait on the existing tag instead of injecting another.
  const existing = document.querySelector<HTMLScriptElement>(
    'script[src*="maps.googleapis.com/maps/api/js"]'
  );
  if (existing) {
    scriptLoading = true;
    existing.addEventListener('load', onMapsReady);
    return;
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  if (!apiKey) return;

  scriptLoading = true;
  // `loading=async` with a callback is Google's supported async-load pattern;
  // the callback fires once the API is actually ready.
  (window as unknown as Record<string, unknown>).__fsMapsReady = onMapsReady;
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=__fsMapsReady`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// --- Dropdown UI ------------------------------------------------------------

const ITEM_CLASS =
  'fs-ac-item px-4 py-2.5 text-sm text-espresso cursor-pointer';
const ITEM_ACTIVE = 'bg-oatmeal';

function extractCity(components: AddressComponent[] | null): string {
  const locality = components?.find((c) => c.types.includes('locality'));
  return locality?.longText ?? '';
}

interface UseAddressAutocompleteOptions {
  onPlaceSelected?: (address: string, city: string) => void;
  country?: string;
}

export function useAddressAutocomplete(
  options: UseAddressAutocompleteOptions = {}
) {
  const { onPlaceSelected, country = 'us' } = options;
  const inputRef = useRef<HTMLInputElement>(null);
  const onPlaceSelectedRef = useRef(onPlaceSelected);
  onPlaceSelectedRef.current = onPlaceSelected;

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    let placesLib: PlacesLibrary | null = null;
    let sessionToken: object | null = null;
    let dropdown: HTMLDivElement | null = null;
    let list: HTMLUListElement | null = null;
    let predictions: PlacePrediction[] = [];
    let activeIndex = -1;
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;
    let requestId = 0;
    let destroyed = false;
    let suppressNextInput = false;

    async function ensurePlaces(): Promise<PlacesLibrary | null> {
      if (placesLib) return placesLib;
      const importLibrary = window.google?.maps?.importLibrary;
      if (!importLibrary) return null;
      try {
        placesLib = (await importLibrary('places')) as PlacesLibrary;
        return placesLib;
      } catch {
        return null;
      }
    }

    function closeDropdown() {
      dropdown?.remove();
      dropdown = null;
      list = null;
      predictions = [];
      activeIndex = -1;
    }

    function openDropdown() {
      if (dropdown) return;
      const parent = input!.parentElement;
      if (!parent) return;
      if (getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }
      dropdown = document.createElement('div');
      dropdown.className =
        'absolute left-0 right-0 z-50 mt-1 bg-white border border-espresso/10 rounded-md shadow-lg overflow-hidden';
      dropdown.style.top = `${input!.offsetTop + input!.offsetHeight}px`;
      list = document.createElement('ul');
      dropdown.appendChild(list);
      // Required attribution when showing Places suggestions without a map.
      const attribution = document.createElement('div');
      attribution.className =
        'px-4 py-1.5 text-right text-[10px] text-driftwood/70 border-t border-espresso/5';
      attribution.textContent = 'powered by Google';
      dropdown.appendChild(attribution);
      parent.appendChild(dropdown);
    }

    function highlight(index: number) {
      activeIndex = index;
      list?.querySelectorAll('li').forEach((li, i) => {
        li.classList.toggle(ITEM_ACTIVE, i === index);
      });
    }

    async function select(prediction: PlacePrediction) {
      closeDropdown();
      // The synthetic input event at the end of selection must not re-open
      // the dropdown with suggestions for the just-selected address.
      suppressNextInput = true;
      try {
        const place = prediction.toPlace();
        await place.fetchFields({
          fields: ['formattedAddress', 'addressComponents'],
        });
        // A selection ends the billing session; start a fresh token.
        sessionToken = placesLib
          ? new placesLib.AutocompleteSessionToken()
          : null;
        const address = place.formattedAddress ?? prediction.text.text;
        const city = extractCity(place.addressComponents);
        input!.value = address;
        onPlaceSelectedRef.current?.(address, city);
      } catch {
        // Details lookup failed — fall back to the raw suggestion text.
        const address = prediction.text.text;
        input!.value = address;
        onPlaceSelectedRef.current?.(address, '');
      }
      // Let React state catch up with the programmatic value change.
      input!.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function renderPredictions(preds: PlacePrediction[]) {
      if (preds.length === 0) {
        closeDropdown();
        return;
      }
      openDropdown();
      if (!list) return;
      predictions = preds;
      activeIndex = -1;
      list.innerHTML = '';
      preds.forEach((p, i) => {
        const li = document.createElement('li');
        li.className = ITEM_CLASS;
        li.textContent = p.text.text;
        li.addEventListener('mouseenter', () => highlight(i));
        // mousedown (not click) so it wins the race against the input's blur.
        li.addEventListener('mousedown', (e) => {
          e.preventDefault();
          void select(p);
        });
        list!.appendChild(li);
      });
    }

    async function fetchSuggestions(value: string) {
      const lib = await ensurePlaces();
      if (!lib || destroyed) return;
      sessionToken ??= new lib.AutocompleteSessionToken();
      const id = ++requestId;
      try {
        const { suggestions } = await lib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: value,
          includedRegionCodes: [country],
          sessionToken,
        });
        if (destroyed || id !== requestId) return;
        renderPredictions(
          suggestions
            .map((s) => s.placePrediction)
            .filter((p): p is PlacePrediction => p !== null)
            .slice(0, 5)
        );
      } catch {
        // API unavailable (not enabled / restricted) — degrade to plain input.
        if (!destroyed) closeDropdown();
      }
    }

    function handleInput() {
      if (suppressNextInput) {
        suppressNextInput = false;
        return;
      }
      const value = input!.value.trim();
      clearTimeout(debounceTimer);
      if (value.length < 3) {
        closeDropdown();
        return;
      }
      debounceTimer = setTimeout(() => void fetchSuggestions(value), 250);
    }

    function handleKeydown(e: KeyboardEvent) {
      if (!dropdown || predictions.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlight((activeIndex + 1) % predictions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlight((activeIndex - 1 + predictions.length) % predictions.length);
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0) {
          e.preventDefault();
          void select(predictions[activeIndex]);
        }
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    }

    function handleBlur() {
      // Delay so a mousedown on a suggestion can complete first.
      setTimeout(() => {
        if (!destroyed) closeDropdown();
      }, 150);
    }

    input.addEventListener('input', handleInput);
    input.addEventListener('keydown', handleKeydown);
    input.addEventListener('blur', handleBlur);

    loadCallbacks.push(() => void ensurePlaces());
    if (scriptLoaded) void ensurePlaces();
    loadGoogleMapsScript();

    return () => {
      destroyed = true;
      clearTimeout(debounceTimer);
      closeDropdown();
      input.removeEventListener('input', handleInput);
      input.removeEventListener('keydown', handleKeydown);
      input.removeEventListener('blur', handleBlur);
    };
  }, [country]);

  return inputRef;
}
