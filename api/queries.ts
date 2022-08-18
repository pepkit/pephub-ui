import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

interface Project {
  id: number
  name: string
  digest: string
  description: string | null
  n_samples: number
}

interface Sample {
  [attribute: string]: string | object | string[] | object[]
}

interface GetProject {
  pep: object
  pep_version: string
  samples: Sample[]
  sample_table_indx: string
  sample_attributes: string[]
}

interface GetNamespace {
  namespace: string
  n_samples: number
  n_projects: number
  projects: Project[]
}

interface GetNamespaces {
  namespaces: string[]
}

interface AllPEPs {
  namespaces: GetNamespace[]
}

export const useNamespace = (namespace: string | string[] | undefined) => {
  return useQuery(
    ['namespace', namespace],
    async () => {
      const { data } = await axios.get<GetNamespace>(
        `${API_BASE}/pep/${namespace}`
      )
      return data
    },
    // only run when a single string is passed
    {
      enabled: typeof namespace === 'string',
    }
  )
}

export const useNamespaces = () => {
  return useQuery(['namespaces'], async () => {
    const { data } = await axios.get<GetNamespaces>(`${API_BASE}/pep/`)
    return data
  })
}

export const useAllPEPs = () => {
  return useQuery(['all-PEPs'], async () => {
    const { data } = await axios.get<AllPEPs>(`${API_BASE}/pep/list`)
    return data
  })
}

export const useProject = (
  namespace: string,
  project: string,
  enable = false
) => {
  return useQuery(
    ['project', namespace, project],
    async () => {
      const { data } = await axios.get<GetProject>(
        `${API_BASE}/pep/${namespace}/${project}`
      )
      return data
    },
    {
      enabled: enable,
    }
  )
}
