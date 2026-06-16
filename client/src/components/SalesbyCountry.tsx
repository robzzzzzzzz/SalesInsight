import { Treemap, Tooltip, ResponsiveContainer } from 'recharts'
import type { SalesByCountry } from '../types/salesByCountry'
import { formatCurrency } from '../utils/formatters'

const COUNTRY_NAMES: Record<string, string> = {
  'USA': 'Estados Unidos',
  'UK': 'Reino Unido',
  'Germany': 'Alemanha',
  'France': 'França',
  'Brazil': 'Brasil',
  'Austria': 'Áustria',
  'Sweden': 'Suécia',
  'Ireland': 'Irlanda',
  'Venezuela': 'Venezuela',
  'Canada': 'Canadá',
}

// tom terroso/verde-oliva suave
const HUE = 95
const SATURATION = 60

function getHeatColor(value: number, maxValue: number): string {
  if (maxValue === 0) return `hsl(${HUE}, ${SATURATION}%, 90%)`
  const ratio = value / maxValue
  const lightness = 90 - ratio * 50
  return `hsl(${HUE}, ${SATURATION}%, ${lightness}%)`
}

export default function SalesByCountryTreemap({ data }: { data: SalesByCountry[] }) {
  const chartData = data.map(item => ({
    name: COUNTRY_NAMES[item.countryName] || item.countryName,
    totalSales: Number(item.totalSales),
  }))

  const maxSales = chartData.length > 0
    ? Math.max(...chartData.map(d => d.totalSales))
    : 0

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
        Vendas por País
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <Treemap
          data={chartData}
          dataKey="totalSales"
          nameKey="name"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={({ x, y, width, height, name, totalSales }) => {
            const salesValue = Number(totalSales)
            const color = getHeatColor(salesValue, maxSales)
            const textColor = '#f5f0eb' // cor clara fixa
            return (
              <g>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={2}
                />
                {width > 60 && height > 30 && (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    fill={textColor}
                    stroke="#1a1a1a"
                    strokeWidth={2.0}   // ← borda mais grossa (antes 1.0)
                    paintOrder="stroke fill"
                    fontSize={16}
                    fontWeight={500}
                  >
                    {name}
                  </text>
                )}
              </g>
            )
          }}
        >
          <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  )
}