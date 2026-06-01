import { useQuery } from '@tanstack/react-query'
import { fetchSalesByCategory } from '../services/salesCategoryService'

export function useSalesByCategory(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ['salesByCategory', startDate, endDate],
    queryFn: () => fetchSalesByCategory(startDate, endDate),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}