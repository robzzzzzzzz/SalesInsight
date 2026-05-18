// hooks/useDateInput.ts
import { useState, useEffect, useRef, useCallback } from 'react'
import type { ChangeEvent } from 'react'
// ---------- Funções auxiliares de data ----------

// Remove tudo que não for dígito e formata como dd/mm/yyyy
// \D é para não dígito e g é para global (todas as ocorrências)
const formatDateInput = (value: string): string => {
  // Remove tudo que não for dígito
  const digits = value.replace(/\D/g, '')
  // Formata conforme o número de dígitos
  if (digits.length <= 2) return digits
  //  Adiciona a barra após o dia e o mês
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  // Formata completo quando tiver 8 dígitos
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`
}

// Verifica se o valor está no formato brasileiro (dd/mm/yyyy)
const brazilianToISO = (value: string): string => {
  //valida o formato e a data
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return ''
  // converte para ISO e valida a data
  const [d, m, y] = value.split('/')
  // O construtor Date aceita o formato ISO (yyyy-mm-dd) e valida a data
  const iso = `${y}-${m}-${d}`
  // Verifica se a data é válida
  if (isNaN(new Date(iso).getTime())) return ''
  return iso
}

// Verifica se o valor está no formato ISO (yyyy-mm-dd)
const isoToBrazilian = (iso: string): string => {
  // Valida o formato ISO
  if (!iso) return ''
  // O construtor Date aceita o formato ISO e valida a data
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
// ------------------------------------------------------------------

interface UseDateInputReturn {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  ref: React.RefObject<HTMLInputElement | null>
}

// Agora K é o tipo da chave (ex.: "startDate" | "endDate")
export function useDateInput<K extends string>(
  initialISO: string,
  paramKey: K,
  setFilter: (key: K, value: string) => void
): UseDateInputReturn {
  // O estado do input é sempre no formato brasileiro para facilitar a digitação
  const [displayValue, setDisplayValue] = useState(isoToBrazilian(initialISO))
  // O ref é para controlar o cursor e evitar que ele pule para o final ao formatar
  const inputRef = useRef<HTMLInputElement>(null)

  // Sincroniza o estado do input com a URL quando o componente monta ou quando a URL muda
  useEffect(() => {
    setDisplayValue(isoToBrazilian(initialISO))
  }, [initialISO])

  // Quando o displayValue muda, converte para ISO e atualiza a URL (mas só se for diferente do valor atual na URL para evitar loops)
  useEffect(() => {
  if (displayValue === '') {
    // Só chama setFilter se a URL não estiver vazia
    if (initialISO !== '') {
      setFilter(paramKey, '')
    }
    return
  }
  
  // Converte para ISO e atualiza a URL se for diferente do valor atual na URL
  const iso = brazilianToISO(displayValue)
  // Só atualiza se a conversão for válida e diferente do valor atual na URL
  if (iso && iso !== initialISO) {
    setFilter(paramKey, iso)
  }
  }, [displayValue, paramKey, setFilter, initialISO])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const previousValue = input.value
    const cursorPosition = input.selectionStart ?? 0

    const formatted = formatDateInput(previousValue)
    setDisplayValue(formatted)

    requestAnimationFrame(() => {
      if (inputRef.current) {
        const newCursor = cursorPosition + (formatted.length - previousValue.length)
        inputRef.current.setSelectionRange(newCursor, newCursor)
      }
    })
  }, [])

  return { value: displayValue, onChange: handleChange, ref: inputRef }
}