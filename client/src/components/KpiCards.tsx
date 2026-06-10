import { DollarSign, ShoppingCart, BarChart3, Info } from 'lucide-react'
import { formatCurrency, formatInteger, formatDecimal } from '../utils/formatters'
import type { SalesSummary } from '../types/sales'

export default function KpiCards({ totalRevenue, totalOrders, avgTicket }: SalesSummary) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      {/* Card Receita */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-1">Receita Total</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-800 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-400 dark:text-gray-500">
          <Info className="h-3.5 w-3.5 mr-1.5 opacity-60" />
          Faturamento bruto do período
        </div>
      </div>

      {/* Card Pedidos */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-1">Total de Pedidos</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatInteger(totalOrders)}
            </p>
          </div>
          <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-400 dark:text-gray-500">
          <Info className="h-3.5 w-3.5 mr-1.5 opacity-60" />
          Pedidos confirmados
        </div>
      </div>

      {/* Card Ticket Médio */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-1">Ticket Médio</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatDecimal(avgTicket)}
            </p>
          </div>
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
            <BarChart3 className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-400 dark:text-gray-500">
          <Info className="h-3.5 w-3.5 mr-1.5 opacity-60" />
          Valor médio por pedido
        </div>
      </div>
    </div>
  )
}