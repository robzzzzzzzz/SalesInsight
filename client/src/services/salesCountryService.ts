import { api } from './api'
import type { SalesByCountry } from '../types/salesByCountry'

export async function fetchSalesByCountry(startDate: string, endDate: string) {
  return api.get<SalesByCountry[]>('/sales-by-country', {
    params: {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
  }).then(res => res.data)
}