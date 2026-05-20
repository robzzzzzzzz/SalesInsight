import { useQuery } from '@tanstack/react-query'
import { fetchSalesSummary } from '../services/salesService'

export function useSalesSummary(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ['salesSummary', startDate, endDate],
    queryFn: () => fetchSalesSummary(startDate, endDate),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}