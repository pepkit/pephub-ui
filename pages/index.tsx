import { PageLayout } from '@/components/layout/page-layout'
import { useUser } from '@/hooks/useUser'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  const { data: githubInfo } = useUser(session?.user?.name, session !== null)
  return (
    <>
      <PageLayout>
        <h1>Welcome to PEPhub</h1>
        {session ? (
          <>
            <p>You are logged in as {session?.user?.name}</p>
            <p>
              Here is your GitHub information:{' '}
              <pre>{JSON.stringify(githubInfo?.data, null, 2)}</pre>
            </p>
          </>
        ) : (
          <p>You are not logged in</p>
        )}
      </PageLayout>
    </>
  )
}
