import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { RevenueMonthly } from '../types/revenue'
import { formatCurrency } from '../utils/formatters'

export default function RevenueChart({ data }: { data: RevenueMonthly[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 mb-8">
      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
        Receita Mensal
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => formatCurrency(v)} />
          <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
          <Line type="monotone" dataKey="revenue" name="Total" stroke="#dc2626" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}