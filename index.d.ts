// interface from this
/**
 * namespace	"nleroy917"
name	"basic"
tag	"default"
is_private	false
number_of_samples	2
description	"This is a basic project."
last_update_date	"2023-02-06 11:46:52.001808"
submission_date	"2022-12-19 12:25:29.492911"
digest	"2bf6e3cf1e4bb71f9a03a49eb0effdc6"
 */

interface ProjectInfo {
  namespace: string
  name: string
  tag: string
  is_private: boolean
  number_of_samples: number
  description: string
  last_update_date: string
  submission_date: string
  digest: string
}

interface NamespaceProjectsResponse {
  items: ProjectInfo[]
  count: number
  limit: number
  offset: number
}

interface NamespaceInfo {
  namespace: string
  number_of_projects: number
  number_of_samples: number
  projects_endpoint: string
}

interface ProjectSearchHit {
  id: number
  version: number
  score: number
  payload: {
    registry: string
    description: string
  }
  vector: null
}

interface SearchResults {
  query: string
  results: ProjectSearchHit[]
  namespace_hits: string[]
}
