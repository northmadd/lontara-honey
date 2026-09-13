import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const countries = [
  { code: '+62', flag: 'id', name: 'Indonesia' },
  { code: '+60', flag: 'my', name: 'Malaysia' },
  { code: '+65', flag: 'sg', name: 'Singapore' },
  { code: '+66', flag: 'th', name: 'Thailand' },
  { code: '+63', flag: 'ph', name: 'Philippines' },
  { code: '+84', flag: 'vn', name: 'Vietnam' },
  { code: '+673', flag: 'bn', name: 'Brunei' },
  { code: '+855', flag: 'kh', name: 'Cambodia' },
  { code: '+856', flag: 'la', name: 'Laos' },
  { code: '+95', flag: 'mm', name: 'Myanmar' },
  { code: '+61', flag: 'au', name: 'Australia' },
  { code: '+81', flag: 'jp', name: 'Japan' },
  { code: '+82', flag: 'kr', name: 'South Korea' },
  { code: '+86', flag: 'cn', name: 'China' },
  { code: '+852', flag: 'hk', name: 'Hong Kong' },
  { code: '+853', flag: 'mo', name: 'Macau' },
  { code: '+886', flag: 'tw', name: 'Taiwan' },
  { code: '+91', flag: 'in', name: 'India' },
  { code: '+92', flag: 'pk', name: 'Pakistan' },
  { code: '+880', flag: 'bd', name: 'Bangladesh' },
  { code: '+64', flag: 'nz', name: 'New Zealand' },
  { code: '+974', flag: 'qa', name: 'Qatar' },
  { code: '+966', flag: 'sa', name: 'Saudi Arabia' },
  { code: '+971', flag: 'ae', name: 'United Arab Emirates' },
  { code: '+49', flag: 'de', name: 'Germany' },
  { code: '+33', flag: 'fr', name: 'France' },
  { code: '+39', flag: 'it', name: 'Italy' },
  { code: '+31', flag: 'nl', name: 'Netherlands' },
  { code: '+44', flag: 'gb', name: 'United Kingdom' },
  { code: '+1', flag: 'us', name: 'United States' },
];

const phonePlaceholders: Record<string, string> = {
  '+62': '812 3456 7890',
  '+60': '12 345 6789',
  '+65': '8123 4567',
  '+66': '81 234 5678',
  '+63': '917 123 4567',
  '+84': '91 234 5678',
  '+673': '712 3456',
  '+855': '12 345 678',
  '+856': '20 1234 5678',
  '+95': '9 123 456 789',
  '+61': '412 345 678',
  '+81': '90 1234 5678',
  '+82': '10 1234 5678',
  '+86': '131 2345 6789',
  '+852': '5123 4567',
  '+853': '6612 3456',
  '+886': '912 345 678',
  '+91': '98765 43210',
  '+92': '300 1234567',
  '+880': '1712 345678',
  '+64': '21 123 4567',
  '+974': '3312 3456',
  '+966': '50 123 4567',
  '+971': '50 123 4567',
  '+49': '151 23456789',
  '+33': '6 12 34 56 78',
  '+39': '312 345 6789',
  '+31': '6 12345678',
  '+44': '7911 123456',
  '+1': '202 555 0123',
};

export const getPhonePlaceholder = (countryCode: string) =>
  phonePlaceholders[countryCode] ?? '812 3456 7890';

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
}

const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({ value, onChange, ariaLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedCountry = countries.find((country) => country.code === value) ?? countries[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 min-w-[100px] items-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground"
      >
        <img
          src={`https://flagcdn.com/w40/${selectedCountry.flag}.png`}
          alt=""
          className="h-4 w-5 rounded-[2px] object-cover"
        />
        <span>{selectedCountry.code}</span>
        <ChevronDown className="ml-auto h-4 w-4" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 top-12 z-50 max-h-60 w-56 overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-lg"
        >
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              role="option"
              aria-selected={country.code === value}
              onClick={() => {
                onChange(country.code);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-sm hover:bg-accent"
            >
              <img
                src={`https://flagcdn.com/w40/${country.flag}.png`}
                alt=""
                className="h-4 w-5 rounded-[2px] object-cover"
              />
              <span className="flex-1">{country.name} {country.code}</span>
              {country.code === value && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelect;
