import { useSearchParams } from 'react-router-dom'

export function useQuery() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''

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