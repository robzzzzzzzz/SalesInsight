import { api } from "./api";
import type { SalesSummary } from "../types/sales";

export async function fetchSalesSummary(startDate: string, endDate: string) {
  return api.get<SalesSummary>('/sales-summary', {
    params: {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
  }).then(res => res.data);
}