import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

const AUTHORIZATION_BASE = process.env.NEXT_PUBLIC_AUTH_BASE

interface Session {
  token: string | null
  signIn: (redirect?: string) => void
  signOut: () => void
  buildAuthorizationURL: (redirect?: string) => string
}

export const useSession = (): Session => {
  const router = useRouter()
  const [pephubJWT, setPEPhubJWT] = useLocalStorage(
    process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'pephub_jwt',
    null
  )

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
    setPEPhubJWT(null)
  }

  const signIn = (redirect: string | undefined = undefined) => {
    const url = buildAuthorizationURL(redirect)
    router.push(url)
  }

  const buildAuthorizationURLCached = useCallback(buildAuthorizationURL, [])
  const signOutCached = useCallback(signOut, [setPEPhubJWT])
  const signInCached = useCallback(signIn, [router])

  return {
    token: pephubJWT,
    signIn: signInCached,
    signOut: signOutCached,
    buildAuthorizationURL: buildAuthorizationURLCached,
  }
}
