import type { TopClients } from '../types/top'
import { api } from './api'

export async function fetchTopClients(startDate: string, endDate: string) {
  return api.get<TopClients[]>('/top-clients', {
    params: {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
  }).then(res => res.data);
}