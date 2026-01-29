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
    initGoogleMaps?: () => void;
  }
}

interface UseAddressAutocompleteOptions {
  onPlaceSelected?: (address: string) => void;
  country?: string;
}

export function useAddressAutocomplete(
  options: UseAddressAutocompleteOptions = {}
) {
  const { onPlaceSelected, country = 'us' } = options;
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const initAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google?.maps?.places) return;
    if (autocompleteRef.current) return; // Already initialized

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country },
        fields: ['formatted_address'],
        types: ['address'],
      }
    );

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.formatted_address && onPlaceSelected) {
        onPlaceSelected(place.formatted_address);
      }
    });
  }, [country, onPlaceSelected]);

  useEffect(() => {
    // If Google Maps is already loaded, initialize immediately
    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    // Otherwise, wait for it to load
    const existingCallback = window.initGoogleMaps;
    window.initGoogleMaps = () => {
      existingCallback?.();
      initAutocomplete();
    };

    return () => {
      if (existingCallback) {
        window.initGoogleMaps = existingCallback;
      }
    };
  }, [initAutocomplete]);

  return inputRef;
}
