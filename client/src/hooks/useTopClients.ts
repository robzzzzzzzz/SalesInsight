import { useQuery } from '@tanstack/react-query'
import { fetchTopClients } from '../services/topClients'

export function useTopClients(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ['topClients', startDate, endDate],
    queryFn: () => fetchTopClients(startDate, endDate),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}