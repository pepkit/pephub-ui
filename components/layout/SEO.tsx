import Head from 'next/head'
import { FC } from 'react'
import { seoDefaults } from '../../public/seo-defaults'

interface Props {
  title?: string
  description?: string
}

export const SEO: FC<Props> = (props) => {
  const { title, description } = props
  return (
    <Head>
      <link rel="icon" type="image/png" href="/pephub_logo.svg" />
      <title>{title || 'PEPhub'}</title>
      <meta
        name="description"
        content={description || seoDefaults.description}
      />
    </Head>
  )
}
