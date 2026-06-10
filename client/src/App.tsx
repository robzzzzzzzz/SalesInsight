import { useQueryParams } from './hooks/useQueryParams'
import { useSalesSummary } from './hooks/useSalesSumary'
import { useRevenueMonthly } from './hooks/useRevenueMonthly'
import { useSalesByCategory } from './hooks/useSalesByCategory'
import { useDateInput } from './hooks/useDateInput'
import { useTopClients } from './hooks/useTopClients'
import { useSalesByCountry } from './hooks/useSalesByCountry'

import { Routes, Route, Navigate } from 'react-router-dom'
import { AsyncRenderer } from './components/AsyncRendererProps'

import KpiCards from './components/KpiCards'
import RevenueChart from './components/RevenueChart'
import SalesByCategory from './components/SalesByCategory'
import TopClients from './components/TopClients'
import SalesByCountryTreemap from './components/SalesbyCountry'

import './App.css'

function App() {
  const { startDate, endDate, setFilter } = useQueryParams()
  
  const { data: salesData, isLoading: salesLoading, error: salesError } = useSalesSummary(startDate, endDate)
  const { data: revenueData, isLoading: revenueLoading, error: revenueError } = useRevenueMonthly(startDate, endDate)
  const { data: salesByCategoryData, isLoading: salesByCategoryLoading, error: salesByCategoryError } = useSalesByCategory(startDate, endDate)
  const { data: topClientsData, isLoading: topClientsLoading, error: topClientsError } = useTopClients(startDate, endDate)
  const { data: salesByCountryData, isLoading: salesByCountryLoading, error: salesByCountryError } = useSalesByCountry(startDate, endDate)
  
  const startInput = useDateInput(startDate, 'startDate', setFilter)
  const endInput = useDateInput(endDate, 'endDate', setFilter)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-900">
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto p-4 pb-12">
            {/* Cabeçalho com título e filtros */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-stone-200 dark:border-gray-700">
              <div>
                <div className="relative inline-block">
                  <h1 className="text-5xl font-medium text-gray-900 dark:text-white pr-16">
                    SalesInsight
                  </h1>
                  <span className="absolute bottom-0 left-66 text-[16px] font-medium text-orange-500 dark:text-orange-400 tracking-wide uppercase">
                    Dashboard
                  </span>
                </div>
                <p className="text-gray-400 dark:text-gray-500 mt-1">
                  Análise de vendas em tempo real
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-[16px] text-gray-400 dark:text-gray-500 select-none">Período</span>
                  <input
                    ref={startInput.ref}
                    type="text"
                    value={startInput.value}
                    onChange={startInput.onChange}
                    placeholder="dd/mm/aaaa"
                    className="w-30 px-3 py-1.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 rounded"
                  />
                  <span className="text-[16px] text-gray-400 dark:text-gray-500 select-none text-gray-400 dark:text-gray-500 select-none">—</span>
                  <input
                    ref={endInput.ref}
                    type="text"
                    value={endInput.value}
                    onChange={endInput.onChange}
                    placeholder="dd/mm/aaaa"
                    className="w-30 px-3 py-1.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 rounded"
                  />
                </div>
              </div>
            </div>

            {/* KPIs */}
            <AsyncRenderer
              isLoading={salesLoading}
              error={salesError}
              data={salesData}
              loadingMessage="Carregando indicadores..."
            >
              {(salesData) => <KpiCards {...salesData} />}
            </AsyncRenderer>

            {/* Receita Mensal */}
            <AsyncRenderer
              isLoading={revenueLoading}
              error={revenueError}
              data={revenueData}
              loadingMessage="Carregando gráfico de receita..."
            >
              {(revenueData) => <RevenueChart data={revenueData} />}
            </AsyncRenderer>

            {/* Vendas por Categoria */}
            <AsyncRenderer
              isLoading={salesByCategoryLoading}
              error={salesByCategoryError}
              data={salesByCategoryData}
              loadingMessage="Carregando vendas por categoria..."
            >
              {(salesByCategoryData) => <SalesByCategory data={salesByCategoryData} />}
            </AsyncRenderer>

            {/* Grid de dois gráficos: Top Clientes + Vendas por País */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <AsyncRenderer
                isLoading={topClientsLoading}
                error={topClientsError}
                data={topClientsData}
                loadingMessage="Carregando top clientes..."
              >
                {(topClientsData) => <TopClients data={topClientsData} />}
              </AsyncRenderer>

              <AsyncRenderer
                isLoading={salesByCountryLoading}
                error={salesByCountryError}
                data={salesByCountryData}
                loadingMessage="Carregando vendas por país..."
              >
                {(salesByCountryData) => <SalesByCountryTreemap data={salesByCountryData} />}
              </AsyncRenderer>
            </div>

            {/* Rodapé */}
            <footer className="mt-12 pt-6 border-t border-stone-200 dark:border-gray-700">
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                SalesInsight © 2026 — Dashboard de Análise de Vendas
              </p>
            </footer>
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App