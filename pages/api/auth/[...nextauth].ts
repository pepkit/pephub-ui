import { Account, DefaultUser, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'

export interface SessionWithAccessToken extends Session {
  access_token?: string
}

export interface JWTWithAccessToken extends JWT {
  access_token?: string
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || '',
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  // callback to inject access_token into session
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT
      user: DefaultUser
      account: Account
    }) {
      if (account && user) {
        token.access_token = account.access_token
      }
      return token
    },
    async session({
      session,
      token,
    }: {
      session: SessionWithAccessToken
      token: JWTWithAccessToken
    }) {
      session.access_token = token.access_token
      return session
    },
  },
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default NextAuth(authOptions)
