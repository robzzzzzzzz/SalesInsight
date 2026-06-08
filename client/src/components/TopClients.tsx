import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { TopClients } from '../types/top'
import { formatCurrency } from '../utils/formatters'

export default function TopClientsChart({ data }: { data: TopClients[] }) {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Top 10 Clientes
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v: number) => formatCurrency(v)} />
          <YAxis
            type="category"
            dataKey="companyName"
            width={140}
            tick={(props) => {
              const { x, y, payload } = props
              return (
                <text
                  x={x}
                  y={y}
                  textAnchor="end"
                  fill="#f5f0eb"
                  stroke="#1a1a1a"
                  strokeWidth={1.2}
                  paintOrder="stroke fill"
                  fontSize={14}
                  fontWeight={700}
                >
                  {payload.value}
                </text>
              )
            }}
          />
          <Bar dataKey="totalSales" name="Total Sales" fill="#ef4444" />
          <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}