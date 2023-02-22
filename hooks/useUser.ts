import { SITE_CONSTS } from '@/data/const'
import jwt from 'jsonwebtoken'
import { useCookies } from 'react-cookie'

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
  const [cookies] = useCookies([SITE_CONSTS.jwt_storage_key])
  if (cookies[SITE_CONSTS.jwt_storage_key] !== null) {
    const decoded: SessionInfo = jwt.decode(
      cookies[SITE_CONSTS.jwt_storage_key]
    )
    return decoded
  } else {
    return null
  }
}
