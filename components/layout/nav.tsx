import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { useSession, signIn, signOut } from 'next-auth/react'

export const NavigationBar = () => {
  const { data: session } = useSession()
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">GitHub</Nav.Link>
            <Nav.Link href="/">API Docs</Nav.Link>
          </Nav>
          {session ? (
            <>
              <Button onClick={() => signOut()} variant="outline-dark">
                <i className="bi bi-github me-1"></i>Logout
              </Button>
              {/* // eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={session.user?.name || 'Logged in user'}
                src={session.user?.image || ''}
                className="rounded-circle ms-2"
                width="40"
                height="40"
              />
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
