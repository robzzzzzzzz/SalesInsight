import { useQuery } from './hooks/useQuery';
import { useDashboard } from './hooks/useDashboard';
import { useDateInput } from './hooks/useDateInput';
import KpiCards from './components/KpiCards';
import './App.css';

function App() {
  const { startDate, endDate, setFilter } = useQuery();
  const { data, isLoading, error } = useDashboard(startDate, endDate);

  const startInput = useDateInput(startDate, 'startDate', setFilter);
  const endInput = useDateInput(endDate, 'endDate', setFilter);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">SalesInsight Dashboard</h1>

      <section className="mb-4 flex gap-2">
        <div>
          <label className="block text-sm">Data inicial</label>
          <input
            ref={startInput.ref}
            type="text"
            value={startInput.value}
            onChange={startInput.onChange}
            placeholder="dd/mm/aaaa"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Data final</label>
          <input
            ref={endInput.ref}
            type="text"
            value={endInput.value}
            onChange={endInput.onChange}
            placeholder="dd/mm/aaaa"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </section>

      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro: {error.message}</p>}
      {data && <KpiCards {...data} />}
    </div>
  );
}

export default App;