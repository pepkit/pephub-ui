import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const api = axios.create({
  baseURL: API_BASE,
})

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

export interface Versions {
  pephub_version: string
  peppy_version: string
  python_version: string
}

export const useVersions = () => {
  return useQuery(['versions'], async () => {
    const { data } = await api.get<Versions>('/_version')
    return data
  })
}

export const useNamespace = (namespace: string | string[] | undefined) => {
  return useQuery(
    ['namespace', namespace],
    async () => {
      const { data } = await api.get<GetNamespace>(`/pep/${namespace}`)
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
    const { data } = await api.get<GetNamespaces>('/pep/')
    return data
  })
}

export const useAllPEPs = () => {
  return useQuery(['all-PEPs'], async () => {
    const { data } = await api.get<AllPEPs>('/pep/list')
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
        `/pep/${namespace}/${project}`
      )
      return data
    },
    {
      enabled: enable,
    }
  )
}
