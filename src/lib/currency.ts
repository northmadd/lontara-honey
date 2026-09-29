export const DEFAULT_USD_RATE = 17757.4; // fallback: 1 USD = 17,757.40 IDR (30 Aug 2026)
export const USD_RATE_REFRESH_MS = 60 * 60 * 1000; // refresh kurs tiap 1 jam

export interface UsdRate {
  rate: number;
  updatedAt: number | null;
  source: 'live' | 'fallback';
}

export const FALLBACK_USD_RATE: UsdRate = {
  rate: DEFAULT_USD_RATE,
  updatedAt: null,
  source: 'fallback',
};

const RATE_API_URL = 'https://open.er-api.com/v6/latest/USD';

interface RateApiResponse {
  result?: string;
  time_last_update_unix?: number;
  rates?: Record<string, number>;
}

export const fetchUsdRate = async (): Promise<UsdRate> => {
  try {
    const res = await fetch(RATE_API_URL);
    if (!res.ok) return FALLBACK_USD_RATE;

    const data = (await res.json()) as RateApiResponse;
    const idr = data?.rates?.IDR;
    if (typeof idr !== 'number' || !Number.isFinite(idr) || idr <= 0) return FALLBACK_USD_RATE;

    const updated = data.time_last_update_unix;
    return {
      rate: idr,
      updatedAt: typeof updated === 'number' ? updated * 1000 : Date.now(),
      source: 'live',
    };
  } catch {
    return FALLBACK_USD_RATE;
  }
};

export const formatIDR = (price: number, language: string): string =>
  new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

export const formatUSD = (price: number, rate: number = DEFAULT_USD_RATE): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price / rate);

export const formatRateDate = (updatedAt: number, language: string): string =>
  new Intl.DateTimeFormat(language === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(updatedAt));
