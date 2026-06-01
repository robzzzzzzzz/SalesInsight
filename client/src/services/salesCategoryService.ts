import { api } from "./api"
import type { SalesByCategory } from "../types/salesByCategory"

export async function fetchSalesByCategory(startDate: string, endDate: string) {
  return api.get<SalesByCategory[]>('/sales-by-category', {
    params: {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
  }).then(res => res.data)
}

