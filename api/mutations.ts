import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export const useCreateNamespace = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (namespace: string) =>
      axios.post(`${API_BASE}/namespace`, { namespace: namespace }),
    {
      onSuccess: () => queryClient.invalidateQueries(['namespaces']),
    }
  )
}
