import jwt from 'jsonwebtoken'
import { useLocalStorage } from './useLocalStorage'

interface SessionInfo {
  orgs: string[]
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string
  email: string
  hireable: boolean
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  exp: number
}

export const useUser = (): SessionInfo | null => {
  const [pephubJWT] = useLocalStorage(
    process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'pephub_jwt',
    null
  )
  if (pephubJWT !== null) {
    const decoded: SessionInfo = jwt.decode(pephubJWT)
    return decoded
  } else {
    return null
  }
}
