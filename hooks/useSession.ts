import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { SITE_CONSTS } from '@/data/const'
import { useCookies } from 'react-cookie'

const AUTHORIZATION_BASE = process.env.NEXT_PUBLIC_AUTH_BASE

interface Session {
  token: string | null
  signIn: (redirect?: string) => void
  signOut: () => void
  buildAuthorizationURL: (redirect?: string) => string
}

export const useSession = (): Session => {
  const router = useRouter()
  const [cookies, , removeCookie] = useCookies([SITE_CONSTS.jwt_storage_key])

  // build helper functions
  const buildAuthorizationURL = (
    redirect: string | undefined = '/login/success'
  ) => {
    const currentURLBase = window.location.origin
    const redirectURL = `${currentURLBase}${redirect}`
    const url = `${AUTHORIZATION_BASE}/login?redirect=${redirectURL}`
    return url
  }

  const signOut = () => {
    removeCookie(SITE_CONSTS.jwt_storage_key)
  }

  const signIn = (redirect: string | undefined = undefined) => {
    const url = buildAuthorizationURL(redirect)
    router.push(url)
  }

  const buildAuthorizationURLCached = useCallback(buildAuthorizationURL, [])
  const signOutCached = useCallback(signOut, [removeCookie])
  const signInCached = useCallback(signIn, [router])

  return {
    token: cookies[SITE_CONSTS.jwt_storage_key],
    signIn: signInCached,
    signOut: signOutCached,
    buildAuthorizationURL: buildAuthorizationURLCached,
  }
}
