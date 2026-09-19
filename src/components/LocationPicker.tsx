import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, Loader2, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org';
const NOMINATIM_EMAIL = 'lontarajayanusantara@gmail.com';
const LOCATIONIQ_URL = 'https://us1.locationiq.com/v1';
const LOCATIONIQ_TOKEN = import.meta.env.VITE_LOCATIONIQ_TOKEN?.trim();
const USE_LOCATIONIQ = Boolean(LOCATIONIQ_TOKEN);
const DEFAULT_CENTER: L.LatLngTuple = [-5.2146092, 119.4524519];

interface PlaceResult {
  place_id: number | string;
  lat: string;
  lon: string;
  display_name: string;
}

const normalize = (item: unknown): PlaceResult => {
  const record = item as Record<string, unknown>;
  return {
    place_id: (record.place_id as number | string) ?? (record.osm_id as number | string) ?? 0,
    lat: String(record.lat),
    lon: String(record.lon),
    display_name: String(record.display_name ?? ''),
  };
};

const fetchProviders = async (url: string, signal?: AbortSignal): Promise<unknown[]> => {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('bad status');
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data?.error) throw new Error('provider error');
  if (data?.display_name) return [data];
  return [];
};

const searchPlaces = async (q: string): Promise<PlaceResult[]> => {
  const url = USE_LOCATIONIQ
    ? `${LOCATIONIQ_URL}/search?key=${LOCATIONIQ_TOKEN}&q=${encodeURIComponent(q)}&format=json&addressdetails=0&limit=6`
    : `${NOMINATIM_URL}/search?format=jsonv2&q=${encodeURIComponent(q)}&limit=5&addressdetails=1&email=${NOMINATIM_EMAIL}`;
  const data = await fetchProviders(url);
  return data.map(normalize);
};

const suggestPlaces = async (q: string): Promise<PlaceResult[]> => {
  if (!USE_LOCATIONIQ) return [];
  const url = `${LOCATIONIQ_URL}/autocomplete?key=${LOCATIONIQ_TOKEN}&q=${encodeURIComponent(q)}&limit=6&tag=place:city,place:town,place:village,address&dedupe=1`;
  const data = await fetchProviders(url);
  return data.map(normalize);
};

const reversePlace = async (lat: number, lng: number): Promise<PlaceResult> => {
  const url = USE_LOCATIONIQ
    ? `${LOCATIONIQ_URL}/reverse?key=${LOCATIONIQ_TOKEN}&lat=${lat}&lon=${lng}&format=json`
    : `${NOMINATIM_URL}/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&email=${NOMINATIM_EMAIL}`;
  const data = await fetchProviders(url);
  if (data.length === 0) throw new Error('not found');
  return normalize(data[0]);
};

const createPinIcon = () =>
  L.divIcon({
    className: '',
    html:
      '<div style="width:32px;height:32px;transform:translate(-50%,-100%);">' +
      '<svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>' +
      '<circle cx="12" cy="10" r="3" fill="#fff"/>' +
      '</svg></div>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

interface LocationPickerProps {
  address: string;
  onSelectAddress: (address: string, lat: number, lng: number) => void;
  title: string;
  searchPlaceholder: string;
  searchLabel: string;
  searchingLabel: string;
  findingLabel: string;
  errorLabel: string;
  hintLabel: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  address,
  onSelectAddress,
  title,
  searchPlaceholder,
  searchLabel,
  searchingLabel,
  findingLabel,
  errorLabel,
  hintLabel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<number | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFinding, setIsFinding] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: DEFAULT_CENTER,
      zoom: 12,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      placeMarker(lat, lng);
      reverseGeocode(lat, lng);
    });

    return () => {
      controllerRef.current?.abort();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!address.trim()) {
      markerRef.current?.remove();
      markerRef.current = null;
    }
  }, [address]);

  // Search-as-you-type suggestions (LocationIQ). Nominatim fallback has no
  // autocomplete endpoint, so suggestions stay empty there.
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    const q = query.trim();
    if (!USE_LOCATIONIQ || q.length < 3) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = window.setTimeout(async () => {
      try {
        const list = await suggestPlaces(q);
        if (query.trim() === q) setSuggestions(list);
      } catch {
        // transient network/provider errors are ignored during typing
      }
    }, 400);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query]);

  const placeMarker = (lat: number, lng: number) => {
    if (!mapRef.current) return;
    if (!markerRef.current) {
      markerRef.current = L.marker([lat, lng], { icon: createPinIcon() }).addTo(mapRef.current);
    } else {
      markerRef.current.setLatLng([lat, lng]);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setIsFinding(true);
    setError('');
    try {
      const place = await reversePlace(lat, lng);
      onSelectAddress(place.display_name, lat, lng);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') setError(errorLabel);
    } finally {
      setIsFinding(false);
    }
  };

  const runSearch = async () => {
    const q = query.trim();
    if (!q) return;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setIsSearching(true);
    setError('');
    setResults([]);
    setSuggestions([]);
    try {
      const list = await searchPlaces(q);
      setResults(list);
      if (list.length === 0) setError(errorLabel);
    } catch {
      setError(errorLabel);
    } finally {
      setIsSearching(false);
    }
  };

  const selectResult = (item: PlaceResult) => {
    const lat = Number(item.lat);
    const lng = Number(item.lon);
    mapRef.current?.setView([lat, lng], 16);
    setQuery(item.display_name);
    setResults([]);
    setSuggestions([]);
    placeMarker(lat, lng);
    onSelectAddress(item.display_name, lat, lng);
  };

  return (
    <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <MapPin className="w-4 h-4 text-primary" />
        {title}
      </p>

      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              runSearch();
            }
          }}
          placeholder={searchPlaceholder}
          className="flex-1 bg-background"
          aria-label={searchPlaceholder}
          autoComplete="off"
        />
        <Button
          type="button"
          onClick={runSearch}
          disabled={isSearching}
          className="shrink-0"
        >
          {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {searchLabel}
        </Button>
      </div>

      {isSearching && (
        <p className="mt-2 text-xs text-muted-foreground dark:text-white/80">{searchingLabel}</p>
      )}

      {suggestions.length > 0 && (
        <ul className="mt-2 rounded-lg border border-border bg-card overflow-hidden divide-y divide-border">
          {suggestions.map((item) => (
            <li key={`s-${item.place_id}`}>
              <button
                type="button"
                onClick={() => selectResult(item)}
                className="w-full px-3 py-2 text-left text-xs text-foreground hover:bg-muted transition-colors"
              >
                {item.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {results.length > 0 && (
        <ul className="mt-2 rounded-lg border border-border bg-card overflow-hidden divide-y divide-border">
          {results.map((item) => (
            <li key={`r-${item.place_id}`}>
              <button
                type="button"
                onClick={() => selectResult(item)}
                className="w-full px-3 py-2 text-left text-xs text-foreground hover:bg-muted transition-colors"
              >
                {item.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

      <div className="relative z-0 mt-3 h-52 w-full overflow-hidden rounded-lg">
        {isFinding && (
          <div className="pointer-events-none absolute inset-x-0 top-2 z-[500] flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-foreground shadow">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
              {findingLabel}
            </span>
          </div>
        )}
        <div ref={containerRef} className="h-full w-full" />
      </div>

      <p className="mt-2 text-xs text-muted-foreground dark:text-white/80">{hintLabel}</p>
      <p className="mt-1 text-[10px] leading-4 text-muted-foreground dark:text-white/60">
        © OpenStreetMap contributors · Geocoding:{' '}
        {USE_LOCATIONIQ ? (
          <a
            href="https://locationiq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LocationIQ
          </a>
        ) : (
          'Nominatim'
        )}
      </p>
    </div>
  );
};

export default LocationPicker;