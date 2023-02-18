import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
