import { FC } from 'react'
import { Navbar } from '../navigation/Navbar'
import { SEO } from './SEO'

interface Props {
  children: React.ReactNode
  title?: string
  description?: string
}

export const Layout: FC<Props> = (props) => {
  const { title, description, children } = props
  return (
    <div className="flex flex-col items-center min-h-screen border border-red-600 px-4">
      <SEO title={title} description={description} />
      <Navbar />
      <div className="max-w-6xl flex-1 flex flex-col items-start w-full">
        {children}
      </div>
    </div>
  )
}
