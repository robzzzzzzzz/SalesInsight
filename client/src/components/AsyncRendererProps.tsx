interface AsyncRendererProps<T> {
  data: T | null | undefined
  isLoading: boolean
  error: Error | null
  loadingMessage?: string
  children: (data: T) => React.ReactNode
}

export function AsyncRenderer<T>({
  data,
  isLoading,
  error,
  loadingMessage = 'Carregando...',
  children 
}: AsyncRendererProps<T>) {
    if (isLoading) {
      return <p className="text-xs text-gray-400">{loadingMessage}</p>
    }
    if (error) {
      return <p className="text-xs text-red-500">Erro: {error.message}</p>
    }
    if (data) {
      return <>{children(data)}</>
    }
    return null
  }