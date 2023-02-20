import { useQuery } from '@tanstack/react-query'

const fetchNamespace = async (
  namespace: string | string[] | undefined
): Promise<NamespaceInfo> => {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE
  const res = await fetch(`${API_BASE}/namespaces/${namespace}`)
  const data = await res.json()
  return data
}

export const useNamespace = (namespace: string | string[] | undefined) => {
  const query = useQuery({
    queryKey: ['namespace', namespace],
    queryFn: () => fetchNamespace(namespace),
    enabled: namespace !== undefined,
  })
  return query
}
