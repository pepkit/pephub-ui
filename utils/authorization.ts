const AUTHORIZATION_BASE = process.env.NEXT_PUBLIC_AUTH_BASE

export const buildAuthorizationURL = (redirect = '/login/success') => {
  const currentURLBase = window.location.origin
  const redirectURL = `${currentURLBase}${redirect}`
  const url = `${AUTHORIZATION_BASE}/login?redirect=${redirectURL}`
  return url
}
