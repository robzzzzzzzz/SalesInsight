import { api } from "./api"
import type { RevenueMonthly } from "../types/revenue";

export async function fetchRevenueMonthly(startDate: string, endDate: string) {
  return api.get<RevenueMonthly[]>('/revenue-monthly', {
    params: {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
  }).then(res => res.data)
}