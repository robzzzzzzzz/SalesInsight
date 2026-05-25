import { useSearchParams } from 'react-router-dom'

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''

  //altera os parâmetros de consulta na URL sem recarregar a página e o url é do front e não do backend, ou seja, é o url do navegador e não o url da API
  const setFilter = (field: 'startDate' | 'endDate', value: string | undefined) => {
    const newParams = new URLSearchParams(searchParams)

    if (value) {
      newParams.set(field, value)
    } else {
      newParams.delete(field)
    }
    
    setSearchParams(newParams, { replace: true })
  }

  return { setFilter, startDate, endDate }
}