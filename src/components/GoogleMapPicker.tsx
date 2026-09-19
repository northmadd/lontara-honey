import React, { useEffect, useRef, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const GOOGLE_MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || '';
const STORE_LAT = -5.2146092;
const STORE_LNG = 119.4524519;

let loaderPromise: Promise<typeof google.maps> | null = null;

const loadGoogleMaps = async (language: string): Promise<typeof google.maps> => {
  if (window.google?.maps) return window.google.maps;
  if (!loaderPromise) {
    loaderPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly&language=${language}&region=ID`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google.maps);
      script.onerror = () => reject(new Error('failed to load Google Maps'));
      document.head.appendChild(script);
    });
    loaderPromise.catch(() => {
      loaderPromise = null;
    });
  }
  return loaderPromise;
};

interface GoogleMapPickerProps {
  address: string;
  onSelectAddress: (address: string, lat: number, lng: number) => void;
  language: string;
  searchPlaceholder: string;
  findingLabel: string;
}

const GoogleMapPicker: React.FC<GoogleMapPickerProps> = ({
  address,
  onSelectAddress,
  language,
  searchPlaceholder,
  findingLabel,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const disposeRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [finding, setFinding] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      try {
        const maps = await loadGoogleMaps(language);
        if (cancelled || !mapContainerRef.current) return;

        const map = new maps.Map(mapContainerRef.current, {
          center: { lat: STORE_LAT, lng: STORE_LNG },
          zoom: 16,
          clickableIcons: true,
        });
        mapRef.current = map;
        geocoderRef.current = new maps.Geocoder();

        const marker = new maps.Marker({
          map,
          position: { lat: STORE_LAT, lng: STORE_LNG },
        });
        markerRef.current = marker;

        map.addListener('click', (e: google.maps.MapMouseEvent) => {
          if (!e.latLng) return;
          placeAt(e.latLng);
        });

        if (inputRef.current) {
          const autocomplete = new maps.places.Autocomplete(inputRef.current, {
            fields: ['formatted_address', 'geometry', 'name'],
            types: ['geocode', 'establishment'],
            componentRestrictions: { country: 'ID' },
          });
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry?.location) return;
            const location = place.geometry.location;
            placeAt(location, place.formatted_address);
          });
        }

        disposeRef.current = () => {
          marker.setMap(null);
        };

        setReady(true);
      } catch (err) {
        if (!cancelled) setLoadError((err as Error).message || 'maps error');
      }
    };

    const placeAt = (location: google.maps.LatLng, preset?: string) => {
      const lat = location.lat();
      const lng = location.lng();
      mapRef.current?.panTo({ lat, lng });
      markerRef.current?.setPosition({ lat, lng });
      reverseGeocode(lat, lng, preset);
    };

    const reverseGeocode = async (lat: number, lng: number, preset?: string) => {
      if (preset) {
        onSelectAddress(preset, lat, lng);
        if (inputRef.current) inputRef.current.value = preset;
        return;
      }
      if (!geocoderRef.current) return;
      setFinding(true);
      try {
        const response = await geocoderRef.current.geocode({ location: { lat, lng } });
        const result = response.results?.[0];
        if (result) {
          const formatted = result.formatted_address;
          onSelectAddress(formatted, lat, lng);
          if (inputRef.current) inputRef.current.value = formatted;
        }
      } catch {
        // no address resolved at that point; keep previous value
      } finally {
        setFinding(false);
      }
    };

    boot();

    return () => {
      cancelled = true;
      disposeRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputRef.current && address.trim()) {
      inputRef.current.value = address;
    }
  }, [address]);

  return (
    <div className="mt-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="bg-background pl-9"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="relative z-0 mt-3 h-64 w-full overflow-hidden rounded-lg border border-border">
        {finding && (
          <div className="pointer-events-none absolute inset-x-0 top-2 z-[1000] flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-foreground shadow">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
              {findingLabel}
            </span>
          </div>
        )}
        {!ready && !loadError && (
          <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-background/60">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        )}
        {loadError && (
          <div className="absolute inset-0 z-[1000] flex items-center justify-center p-4 text-center text-xs text-destructive">
            {loadError}
          </div>
        )}
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>
    </div>
  );
};

export default GoogleMapPicker;