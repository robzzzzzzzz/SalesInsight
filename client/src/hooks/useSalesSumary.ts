import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface DashboardData {
  totalRevenue: string;
  totalOrders: number;
  avgTicket: string;
}

export function useDashboard(startDate: string, endDate: string) {
  return useQuery<DashboardData>({
    queryKey: ['dashboard', startDate, endDate],
    queryFn: () =>
      axios
        .get('http://localhost:3000/api/dashboard',
        {
          params: {
            startDate: startDate || undefined,
            endDate: endDate || undefined,
          },
        })
        .then((res) => res.data),


    staleTime: 1000 * 60 * 5, // 5 minutos: considera os dados "frescos" nesse tempo
    retry: 2, // tenta mais 2 vezes se falhar
    refetchOnWindowFocus: false, // não re-buscar ao trocar de aba
  });
}