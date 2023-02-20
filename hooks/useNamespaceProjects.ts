import { useQuery } from '@tanstack/react-query'

interface Params {
  query?: string
  limit?: number
  offset?: number
}

const fetchNamespaceProjects = async (
  namespace: string | string[] | undefined,
  params: Params = {}
): Promise<NamespaceProjectsResponse> => {
  // convert params object to URL params
  const urlParams = new URLSearchParams()
  if (params.query) {
    urlParams.append('q', params.query)
  }
  if (params.limit) {
    urlParams.append('limit', params.limit.toString())
  }
  if (params.offset) {
    urlParams.append('offset', params.offset.toString())
  }

  const url = `namespaces/${namespace}/projects?${urlParams.toString()}`

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE
  const res = await fetch(`${API_BASE}/${url}`)
  const data = await res.json()
  return data
}

export const useNamespaceProjects = (
  namespace: string | string[] | undefined,
  params: Params = {}
) => {
  const query = useQuery({
    queryKey: ['namespace-projects', namespace, params],
    queryFn: () => fetchNamespaceProjects(namespace, params),
    enabled: namespace !== undefined,
  })
  return query
}
