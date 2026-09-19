import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface MapPlace {
  placeId: string;
  lat: number;
  lon: number;
  display_name: string;
}

interface MapPickerProps {
  places: MapPlace[];
  selected: MapPlace | null;
  center: [number, number];
  zoom: number;
  language: 'en' | 'id';
  loadingLabel: string;
  onSelect: (place: MapPlace) => void;
}

const makePinIcon = (number: number | null, selected: boolean) => {
  const fill = selected ? '#f59e0b' : '#b45309';
  const numberText = number == null
    ? ''
    : `<text x="12" y="14.5" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff" font-family="Arial, sans-serif">${number}</text>`;
  return L.divIcon({
    className: '',
    html: `<svg width="34" height="34" viewBox="0 0 24 31" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,.35));">
      <path d="M12 2C7.2 2 3 6 3 11c0 6.5 9 18 9 18s9-11.5 9-18C21 6 16.8 2 12 2z" fill="${fill}" stroke="#ffffff" stroke-width="1.6"/>
      <circle cx="12" cy="11" r="4.6" fill="${fill}" stroke="#ffffff" stroke-width="1.4"/>
      ${numberText}
    </svg>`,
    iconSize: [34, 34],
    iconAnchor: [17, 31],
    popupAnchor: [0, -30],
  });
};

const MapPicker: React.FC<MapPickerProps> = ({ places, selected, center, zoom, language, loadingLabel, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  const languageRef = useRef(language);
  const initialCenterRef = useRef(center);
  const initialZoomRef = useRef(zoom);
  const lastPlacesKeyRef = useRef('');
  const [reversing, setReversing] = useState(false);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: initialCenterRef.current,
      zoom: initialZoomRef.current,
      zoomControl: true,
      attributionControl: true,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);

    map.on('click', async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setReversing(true);
      try {
        const params = new URLSearchParams({
          format: 'jsonv2',
          lat: lat.toFixed(6),
          lon: lng.toFixed(6),
          'accept-language': languageRef.current,
          zoom: '17',
        });
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
          { headers: { Accept: 'application/json' } },
        );
        if (res.ok) {
          const data = (await res.json()) as { display_name?: string };
          onSelectRef.current({
            placeId: `click-${lat.toFixed(6)}-${lng.toFixed(6)}`,
            lat,
            lon: lng,
            display_name: data?.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
          });
        }
      } catch {
        onSelectRef.current({
          placeId: `click-${lat.toFixed(6)}-${lng.toFixed(6)}`,
          lat,
          lon: lng,
          display_name: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
        });
      } finally {
        setReversing(false);
      }
    });

    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(containerRef.current);
    window.setTimeout(() => map.invalidateSize(), 150);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    places.forEach((place, idx) => {
      const active = selected?.placeId === place.placeId;
      L.marker([place.lat, place.lon], {
        icon: makePinIcon(idx + 1, active),
        title: place.display_name,
        zIndexOffset: active ? 1000 : 0,
      })
        .on('click', () => onSelectRef.current(place))
        .addTo(layer);
    });

    if (selected && !places.some((p) => p.placeId === selected.placeId)) {
      L.marker([selected.lat, selected.lon], {
        icon: makePinIcon(null, true),
        title: selected.display_name,
        zIndexOffset: 1000,
      })
        .on('click', () => onSelectRef.current(selected))
        .addTo(layer);
    }

    const placesKey = places.map((p) => p.placeId).join('|');
    if (placesKey !== lastPlacesKeyRef.current) {
      lastPlacesKeyRef.current = placesKey;
      if (places.length > 1) {
        const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lon] as [number, number]));
        map.fitBounds(bounds, { padding: [44, 44] });
      } else if (places.length === 1) {
        map.setView([places[0].lat, places[0].lon], 16);
      } else if (selected) {
        map.setView([selected.lat, selected.lon], Math.max(map.getZoom(), 15));
      }
    } else if (selected) {
      map.panTo([selected.lat, selected.lon]);
    }
  }, [places, selected]);

  return (
    <div className="relative h-64 w-full">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      {reversing && (
        <div className="absolute right-2 top-2 z-[500] rounded-full bg-card/90 px-3 py-1 text-xs text-foreground shadow">
          {loadingLabel}
        </div>
      )}
    </div>
  );
};

export default MapPicker;