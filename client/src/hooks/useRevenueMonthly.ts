import { useQuery } from '@tanstack/react-query'
import { fetchRevenueMonthly } from '../services/revenueService'

export function useRevenueMonthly(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ['revenueMonthly', startDate, endDate],
    queryFn: () => fetchRevenueMonthly(startDate, endDate),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}