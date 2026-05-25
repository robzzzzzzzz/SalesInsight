import { DollarSign, ShoppingCart, BarChart3, TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatInteger, formatDecimal } from '../utils/formatters'
import type { SalesSummary } from '../types/sales'

export default function KpiCards({ totalRevenue, totalOrders, avgTicket }: SalesSummary) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {/* Card Receita */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Receita Total</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-green-600 dark:text-green-400 font-medium">+12.5%</span>
          <span className="text-gray-400 dark:text-gray-500 ml-1">vs mês anterior</span>
        </div>
      </div>

      {/* Card Pedidos */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total de Pedidos</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatInteger(totalOrders)}
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-green-600 dark:text-green-400 font-medium">+5.2%</span>
          <span className="text-gray-400 dark:text-gray-500 ml-1">vs mês anterior</span>
        </div>
      </div>

      {/* Card Ticket Médio */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ticket Médio</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatDecimal(avgTicket)}
            </p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
            <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          <span className="text-red-600 dark:text-red-400 font-medium">-3.1%</span>
          <span className="text-gray-400 dark:text-gray-500 ml-1">vs mês anterior</span>
        </div>
      </div>
    </div>
  )
}