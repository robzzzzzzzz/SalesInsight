import { useQuery } from './hooks/useQuery'
import { useDashboard } from './hooks/useDashboard'
import './App.css'
import KpiCards from './components/KpiCards'

function App() {
  const { startDate, endDate, setFilter } = useQuery()
  const { data, isLoading, error } = useDashboard(startDate, endDate)
  console.log('Dados do dashboard:', data)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">SalesInsight Dashboard</h1>

      <section className="mb-4 flex gap-2">
        <div>
          <label className="block text-sm">Data inicial</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setFilter('startDate', e.target.value)}
            className="hide-date-picker border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Data final</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setFilter('endDate', e.target.value)}
            className="hide-date-picker border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </section>

      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro: {error.message}</p>}
      {data && <KpiCards {...data} />}
    </div>
  )
}

export default App