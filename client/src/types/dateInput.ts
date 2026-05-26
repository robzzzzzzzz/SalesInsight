import type { ChangeEvent } from 'react'

export interface UseDateInputReturn {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  ref: React.RefObject<HTMLInputElement | null>
}