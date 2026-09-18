import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const countries = [
  { code: '+62', flag: 'id', nameKey: 'country.indonesia' },
  { code: '+60', flag: 'my', nameKey: 'country.malaysia' },
  { code: '+65', flag: 'sg', nameKey: 'country.singapore' },
  { code: '+66', flag: 'th', nameKey: 'country.thailand' },
  { code: '+63', flag: 'ph', nameKey: 'country.philippines' },
  { code: '+84', flag: 'vn', nameKey: 'country.vietnam' },
  { code: '+673', flag: 'bn', nameKey: 'country.brunei' },
  { code: '+855', flag: 'kh', nameKey: 'country.cambodia' },
  { code: '+856', flag: 'la', nameKey: 'country.laos' },
  { code: '+95', flag: 'mm', nameKey: 'country.myanmar' },
  { code: '+61', flag: 'au', nameKey: 'country.australia' },
  { code: '+81', flag: 'jp', nameKey: 'country.japan' },
  { code: '+82', flag: 'kr', nameKey: 'country.southKorea' },
  { code: '+86', flag: 'cn', nameKey: 'country.china' },
  { code: '+852', flag: 'hk', nameKey: 'country.hongKong' },
  { code: '+853', flag: 'mo', nameKey: 'country.macau' },
  { code: '+886', flag: 'tw', nameKey: 'country.taiwan' },
  { code: '+91', flag: 'in', nameKey: 'country.india' },
  { code: '+92', flag: 'pk', nameKey: 'country.pakistan' },
  { code: '+880', flag: 'bd', nameKey: 'country.bangladesh' },
  { code: '+64', flag: 'nz', nameKey: 'country.newZealand' },
  { code: '+974', flag: 'qa', nameKey: 'country.qatar' },
  { code: '+966', flag: 'sa', nameKey: 'country.saudiArabia' },
  { code: '+971', flag: 'ae', nameKey: 'country.uae' },
  { code: '+49', flag: 'de', nameKey: 'country.germany' },
  { code: '+33', flag: 'fr', nameKey: 'country.france' },
  { code: '+39', flag: 'it', nameKey: 'country.italy' },
  { code: '+31', flag: 'nl', nameKey: 'country.netherlands' },
  { code: '+44', flag: 'gb', nameKey: 'country.uk' },
  { code: '+1', flag: 'us', nameKey: 'country.us' },
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
  const { t } = useLanguage();
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
              <span className="flex-1">{t(country.nameKey)} {country.code}</span>
              {country.code === value && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelect;
