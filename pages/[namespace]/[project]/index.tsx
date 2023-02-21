import { PageLayout } from '@/components/layout/page-layout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Project: NextPage = () => {
  // query things
  const router = useRouter()
  const { project } = router.query

  // get second to last item in path
  const namespace = router.asPath.split('/').slice(-2)[0]

  return (
    <PageLayout title={`${namespace}/${project}`}>
      <h1>Project: {project}</h1>
    </PageLayout>
  )
}

export default Project
