import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useQuery } from './hooks/useQuery';
import { useDashboard } from './hooks/useDashboard';
import KpiCards from './components/KpiCards';
import './App.css';

// Máscara que insere barras automaticamente enquanto digita
const formatDateInput = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

// Converte DD/MM/AAAA → YYYY-MM-DD
const brazilianToISO = (value: string): string => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return '';
  const [d, m, y] = value.split('/');
  const iso = `${y}-${m}-${d}`;
  if (isNaN(new Date(iso).getTime())) return '';
  return iso;
};

// Converte YYYY-MM-DD → DD/MM/AAAA
const isoToBrazilian = (iso: string): string => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

function App() {
  const { startDate, endDate, setFilter } = useQuery();
  const { data, isLoading, error } = useDashboard(startDate, endDate);

  const [inputStart, setInputStart] = useState(isoToBrazilian(startDate));
  const [inputEnd, setInputEnd] = useState(isoToBrazilian(endDate));

  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  // Sincroniza com a URL
  useEffect(() => {
    setInputStart(isoToBrazilian(startDate));
    setInputEnd(isoToBrazilian(endDate));
  }, [startDate, endDate]);

  // Aplica filtro quando a data está completa ou campo vazio
  useEffect(() => {
    if (inputStart === '') {
      setFilter('startDate', '');
      return;
    }
    const iso = brazilianToISO(inputStart);
    if (iso) setFilter('startDate', iso);
  }, [inputStart]);

  useEffect(() => {
    if (inputEnd === '') {
      setFilter('endDate', '');
      return;
    }
    const iso = brazilianToISO(inputEnd);
    if (iso) setFilter('endDate', iso);
  }, [inputEnd]);

  // Handler com preservação do cursor
  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const previousValue = input.value;
    const cursorPosition = input.selectionStart ?? 0;

    const formatted = formatDateInput(previousValue);
    setInputStart(formatted);

    // Ajusta a posição do cursor após a formatação
    requestAnimationFrame(() => {
      if (startRef.current) {
        const newCursor = cursorPosition + (formatted.length - previousValue.length);
        startRef.current.setSelectionRange(newCursor, newCursor);
      }
    });
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const previousValue = input.value;
    const cursorPosition = input.selectionStart ?? 0;

    const formatted = formatDateInput(previousValue);
    setInputEnd(formatted);

    requestAnimationFrame(() => {
      if (endRef.current) {
        const newCursor = cursorPosition + (formatted.length - previousValue.length);
        endRef.current.setSelectionRange(newCursor, newCursor);
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">SalesInsight Dashboard</h1>

      <section className="mb-4 flex gap-2">
        <div>
          <label className="block text-sm">Data inicial</label>
          <input
            ref={startRef}
            type="text"
            value={inputStart}
            onChange={handleStartChange}
            placeholder="dd/mm/aaaa"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Data final</label>
          <input
            ref={endRef}
            type="text"
            value={inputEnd}
            onChange={handleEndChange}
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