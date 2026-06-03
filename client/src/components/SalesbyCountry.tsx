import { Treemap, Tooltip, ResponsiveContainer } from 'recharts'
import type { SalesByCountry } from '../types/salesByCountry'

const COLORS = [
  '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c',
  '#d0ed57', '#ffc658', '#ff8042', '#ff6361', '#bc5090'
]

export default function SalesByCountryTreemap({ data }: { data: SalesByCountry[] }) {
  // Converte para o formato que o Treemap do Recharts aceita
  const chartData = data.map(item => ({
    name: item.countryName,           // antes estava item.companyName
    totalSales: Number(item.totalSales), // converte string para número
  }))

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Vendas por País
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <Treemap
          data={chartData}
          dataKey="totalSales"
          nameKey="name"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
        >
          <Tooltip
            formatter={(value) =>
              `R$ ${Number(value).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            }
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  )
}