import { useEventListener } from '@/hooks/useEventListener'
import { FC, useCallback, useEffect } from 'react'
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
  // keydown handler for global search
  const globalSearchFocuser = useCallback(({ e }: { e: KeyboardEvent }) => {
    e.preventDefault()
    if (e.key === ']') {
      const searchInput = document.getElementById('global-search')
      if (searchInput) {
        searchInput.focus()
      }
    }
  }, [])

  // add keydown listener for global search
  useEventListener('keydown', globalSearchFocuser)

  return (
    <main style={{ minHeight: '100vh' }}>
      <SEO title={title} description={description} />
      <NavigationBar />
      <Container className="h-100">{children}</Container>
    </main>
  )
}
