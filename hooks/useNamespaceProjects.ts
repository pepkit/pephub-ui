import { useQuery } from '@tanstack/react-query'

const fetchNamespaceProjects = async (
  namespace: string | string[] | undefined
): Promise<NamespaceProjectsResponse> => {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE
  const res = await fetch(`${API_BASE}/namespaces/${namespace}/projects`)
  const data = await res.json()
  return data
}

export const useNamespaceProjects = (
  namespace: string | string[] | undefined
) => {
  const query = useQuery({
    queryKey: ['namespace-projects', namespace],
    queryFn: () => fetchNamespaceProjects(namespace),
    enabled: namespace !== undefined,
  })
  return query
}
