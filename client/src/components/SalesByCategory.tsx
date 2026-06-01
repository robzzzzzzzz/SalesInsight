import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { SalesByCategory } from '../types/salesByCategory'

export default function SalesByCategoryChart({ data }: { data: SalesByCategory[] }) {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Vendas por Categoria
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="categoryName" tick={{ fontSize: 12 }} />
          {/* Eixo Y principal (receita) */}
          <YAxis tick={{ fontSize: 12 }} />
          {/* Eixo Y secundário (quantidade) */}
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
          <Tooltip />
          {/* Barra de receita (eixo esquerdo) */}
          <Bar dataKey="totalSales" fill="#6366f1" />
          {/* Barra de quantidade (eixo direito) */}
          <Bar dataKey="totalQuantity" fill="#d1d5db" yAxisId="right" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}