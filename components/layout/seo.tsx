import Head from 'next/head'
import { SITE_CONSTS } from '@/data/const'
import { FC } from 'react'

interface Props {
  title?: string
  description?: string
}

export const SEO: FC<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>{title || SITE_CONSTS.title}</title>
      <meta
        name="description"
        content={description || SITE_CONSTS.description}
      />
    </Head>
  )
}
