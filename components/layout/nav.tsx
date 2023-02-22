import Image from 'next/image'
import { useState } from 'react'
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/router'
import { useSession } from '@/hooks/useSession'

export const NavigationBar = () => {
  const user = useUser()

  const [searchQuery, setSearchQuery] = useState('')

  const { signIn, signOut } = useSession()

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
          {user ? (
            <>
              <Dropdown>
                <Dropdown.Toggle variant="outline" id="dropdown-basic">
                  Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href={`/${user.login}`}>My PEPs</Dropdown.Item>
                  <Dropdown.Item onClick={() => signOut()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Image
                alt={user?.name || 'Logged in user'}
                src={user?.avatar_url || ''}
                className="rounded-circle ms-2"
                width="40"
                height="40"
              />
              {/* // eslint-disable-next-line @next/next/no-img-element */}
            </>
          ) : (
            <Button onClick={() => signIn()} variant="dark">
              <i className="bi bi-github me-1"></i>Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
