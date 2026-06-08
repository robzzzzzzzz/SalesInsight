import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { SalesByCategory } from '../types/salesByCategory'
import { formatCurrency, formatInteger } from '../utils/formatters'

export default function SalesByCategoryChart({ data }: { data: SalesByCategory[] }) {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Vendas por Categoria
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gráfico de Receita */}
        <div>
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 text-center">
            Receita
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="categoryName" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => formatCurrency(v)} />
              <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
              <Bar dataKey="totalSales" name="Receita" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Quantidade */}
        <div>
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 text-center">
            Quantidade
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="categoryName" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => formatInteger(v)} />
              <Tooltip formatter={(value: any) => formatInteger(Number(value))} />
              <Bar dataKey="totalQuantity" name="Quantidade" fill="#eab308" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}