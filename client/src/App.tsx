import { useQueryParams } from './hooks/useQueryParams'
import { useSalesSummary } from './hooks/useSalesSumary'
import { useDateInput } from './hooks/useDateInput'
import { Routes, Route, Navigate } from 'react-router-dom';
import KpiCards from './components/KpiCards'
import './App.css'

function App() {
  const { startDate, endDate, setFilter } = useQueryParams()
  const { data, isLoading, error } = useSalesSummary(startDate, endDate)

  const startInput = useDateInput(startDate, 'startDate', setFilter)
  const endInput = useDateInput(endDate, 'endDate', setFilter)

  return (
    <div className="container mx-auto p-4">
      {/* Cabeçalho: título + subtítulo à esquerda, filtros à direita */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="relative inline-block">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white pr-16">
              SalesInsight
            </h2>
            <span className="absolute bottom-0 right-0 text-[10px] font-medium text-indigo-500 dark:text-indigo-400 tracking-wide uppercase">
              Dashboard
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Análise de vendas em tempo real
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] text-gray-400 dark:text-gray-500 select-none">Período</span>
            <div className="flex items-center gap-1.5"></div>
            <input
              ref={startInput.ref}
              type="text"
              value={startInput.value}
              onChange={startInput.onChange}
              placeholder="dd/mm/aaaa"
              className="w-22 px-2 py-1.5 text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none"
            />
            <span className="text-gray-300 dark:text-gray-600 text-xs">—</span>
            <input
              ref={endInput.ref}
              type="text"
              value={endInput.value}
              onChange={endInput.onChange}
              placeholder="dd/mm/aaaa"
              className="w-22 px-2 py-1.5 text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none"
            />
            </div>
          </div>
        </div>

      {/* Resultados */}
      <section className="mt-8">
        {isLoading && <p className="text-xs text-gray-400">Carregando...</p>}
        {error && <p className="text-xs text-red-500">Erro: {error.message}</p>}
        {data && <KpiCards {...data} />}
      </section>
      
      <Routes>
      <Route path="/" element={
        <div className="container mx-auto p-4">
          {/* todo o JSX do seu dashboard atual */}
        </div>
      } />
      {/* Qualquer outra rota redireciona para a raiz */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
  )
}

export default App