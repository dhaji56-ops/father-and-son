import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            options?: google.maps.places.AutocompleteOptions
          ) => google.maps.places.Autocomplete;
        };
      };
    };
  }
}

interface UseAddressAutocompleteOptions {
  onPlaceSelected?: (address: string, city: string) => void;
  country?: string;
}

let scriptLoading = false;
let scriptLoaded = false;
const loadCallbacks: (() => void)[] = [];

function loadGoogleMapsScript() {
  if (scriptLoaded || scriptLoading) return;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  if (!apiKey) return;

  scriptLoading = true;
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    scriptLoaded = true;
    scriptLoading = false;
    loadCallbacks.forEach((cb) => cb());
    loadCallbacks.length = 0;
  };
  document.head.appendChild(script);
}

export function useAddressAutocomplete(
  options: UseAddressAutocompleteOptions = {}
) {
  const { onPlaceSelected, country = 'us' } = options;
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const initAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google?.maps?.places) return;
    if (autocompleteRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country },
        fields: ['formatted_address', 'address_components'],
        types: ['address'],
      }
    );

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.formatted_address && onPlaceSelected) {
        const cityComponent = place.address_components?.find((c: google.maps.GeocoderAddressComponent) =>
          c.types.includes('locality')
        );
        const city = cityComponent?.long_name ?? '';
        onPlaceSelected(place.formatted_address, city);
      }
    });
  }, [country, onPlaceSelected]);

  useEffect(() => {
    // If Google Maps is already loaded, initialize immediately
    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    // Register callback for when script loads
    loadCallbacks.push(initAutocomplete);

    // Trigger script loading
    loadGoogleMapsScript();

    return () => {
      const idx = loadCallbacks.indexOf(initAutocomplete);
      if (idx >= 0) loadCallbacks.splice(idx, 1);
    };
  }, [initAutocomplete]);

  return inputRef;
}
