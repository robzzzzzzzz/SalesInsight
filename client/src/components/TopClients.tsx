import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { TopClients } from '../types/top'

export default function TopClientsChart({ data }: { data: TopClients[] }) {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Top 10 Clientes
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="companyName" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="totalSales" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}