import { PageLayout } from '@/components/layout/page-layout'
import { useUser } from '@/hooks/useUser'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

export default function Home() {
  const session = useSession()
  const { data: user } = useUser(session.data?.user?.name, session !== null)
  return (
    <>
      <PageLayout>
        <div
          className="d-flex flex column align-items-center justify-content-center"
          style={{ minHeight: '80vh' }}
        >
          <div className="col-6">
            <h1 className="fw-bolder">Easy management of sample metadata.</h1>
            <p>
              PEPhub is a database, web interface, and API for sharing,
              retrieving, and validating sample metadata. PEPhub takes advantage
              of the Portable Encapsulated Projects (PEP) biological metadata
              standard to let you store, edit, and access your PEPs in one
              convenient place.
            </p>

            <p>
              To get started submitting your own sample metadata, you only need
              a GitHub account.
            </p>
            <div className="d-flex flex-row align-items-center">
              {session ? (
                <Link
                  className="text-decoration-none"
                  href={`/${user?.data.login}`}
                >
                  <Button
                    className="d-flex flex-row align-items-center me-2"
                    variant="dark"
                    size="lg"
                  >
                    <Image
                      className="me-1"
                      src="/pep.svg"
                      alt="PEP logo"
                      height="30"
                      width="30"
                    />
                    View My PEPs
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={() => signIn()}
                  variant="dark"
                  size="lg"
                  className="me-2"
                >
                  <i className="bi bi-github me-1"></i>
                  Login with GitHub
                </Button>
              )}

              <Button size="lg" variant="outline-dark">
                <i className="bi bi-check2-circle me-1"></i>
                Validation
              </Button>
            </div>
          </div>
          <div className="col-6 align-items-center">
            <Image
              className="ms-5"
              alt="landing icon"
              src="/landing_icon.svg"
              width="400"
              height="400"
            />
          </div>
        </div>
      </PageLayout>
    </>
  )
}
