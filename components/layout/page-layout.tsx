import { FC } from 'react'
import { Container } from 'react-bootstrap'
import { NavigationBar } from './nav'
import { SEO } from './seo'

interface Props {
  children: React.ReactNode
  title?: string
  description?: string
  bgBlue?: boolean
}

export const PageLayout: FC<Props> = ({ children, title, description }) => {
  return (
    <main style={{ minHeight: '100vh' }}>
      <SEO title={title} description={description} />
      <NavigationBar />
      <Container className="h-100">{children}</Container>
    </main>
  )
}
