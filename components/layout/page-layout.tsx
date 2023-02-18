import { FC } from 'react'
import { Container } from 'react-bootstrap'
import { NavigationBar } from './nav'
import { SEO } from './seo'

interface Props {
  children: React.ReactNode
  title?: string
  description?: string
}

export const PageLayout: FC<Props> = ({ children, title, description }) => {
  return (
    <>
      <SEO title={title} description={description} />
      <NavigationBar />
      <Container>{children}</Container>
    </>
  )
}
