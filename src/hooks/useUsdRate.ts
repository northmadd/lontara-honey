import { useQuery } from '@tanstack/react-query';
import {
  FALLBACK_USD_RATE,
  fetchUsdRate,
  USD_RATE_REFRESH_MS,
  type UsdRate,
} from '@/lib/currency';

export const useUsdRate = (): UsdRate => {
  const { data } = useQuery({
    queryKey: ['usd-idr-rate'],
    queryFn: fetchUsdRate,
    staleTime: USD_RATE_REFRESH_MS,
    gcTime: USD_RATE_REFRESH_MS * 2,
    refetchInterval: USD_RATE_REFRESH_MS,
    refetchIntervalInBackground: false,
    retry: 2,
  });

  return data ?? FALLBACK_USD_RATE;
};
