import Image from 'next/image'
import { useState } from 'react'
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/router'

export const NavigationBar = () => {
  const { data: session } = useSession()
  const { data: githubInfo } = useUser(session?.user?.name, session !== null)

  const [searchQuery, setSearchQuery] = useState('')

  const router = useRouter()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="/pephub_logo.svg"
            height="40"
            width="150"
            alt="PEPhub logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://github.com/pepkit/pephub">
              <i className="bi bi-github me-1"></i>GitHub
            </Nav.Link>
            <Nav.Link href="https://pephub.databio.org/api/v1/docs">
              <i className="bi bi-book me-1"></i>API Docs
            </Nav.Link>
          </Nav>
          <input
            id="global-search"
            placeholder="Search PEPhub"
            className="form-control w-25 me-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(`/search?query=${searchQuery}`)
              }
            }}
          />
          <div className="border px-2 rounded text-muted shift-left">/</div>
          {session ? (
            <>
              <Dropdown>
                <Dropdown.Toggle variant="outline" id="dropdown-basic">
                  Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href={`/${githubInfo?.data.login}`}>
                    My PEPs
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => signOut()} href="#/action-3">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Image
                alt={session.user?.name || 'Logged in user'}
                src={session.user?.image || ''}
                className="rounded-circle ms-2"
                width="40"
                height="40"
              />
              {/* // eslint-disable-next-line @next/next/no-img-element */}
            </>
          ) : (
            <Button variant="dark" onClick={() => signIn('github')}>
              <i className="bi bi-github me-1"></i>Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
