import { useQuery } from '@tanstack/react-query'
import { fetchSalesByCountry } from '../services/salesCountryService'

export function useSalesByCountry(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ['salesByCountry', startDate, endDate],
    queryFn: () => fetchSalesByCountry(startDate, endDate),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}