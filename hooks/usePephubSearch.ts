import { useQuery } from '@tanstack/react-query'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const searchPephub = async (query: string) => {
  const res = await fetch(`${API_BASE}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  const data = await res.json()
  return data
}

export const usePephubSearch = (query: string) => {
  const q = useQuery({
    queryKey: ['pephub-search', query],
    queryFn: () => searchPephub(query),
    enabled: query !== '' && query !== undefined,
  })
  return q
}
