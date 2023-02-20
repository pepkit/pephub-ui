import { useRouter } from 'next/router'
import { PageLayout } from '@/components/layout/page-layout'
import { NextPage } from 'next'
import { useNamespaceProjects } from '@/hooks/useNamespaceProjects'
import { Button } from 'react-bootstrap'
import { useSession } from 'next-auth/react'
import { useUser } from '@/hooks/useUser'
import { useNamespace } from '@/hooks/useNamespace'
import { ProjectCard } from '@/components/projects/project-card'
import { useState } from 'react'
import { DeletePEPModal } from '@/components/modals/delete-modal'
import { AddPEPModal } from '@/components/modals/add-modal'

const NamespacePage: NextPage = () => {
  // query things
  const router = useRouter()
  const { namespace } = router.query

  // user and session
  const { data: session } = useSession()
  const { data: user } = useUser(session?.user?.name, session !== null)

  // namespace things
  const {
    data: namespaceProjects,
    isLoading: isLoadingNamespace,
    error,
  } = useNamespaceProjects(namespace)
  const { data: namespaceInfo, isLoading: isLoadingNamespaceInfo } =
    useNamespace(namespace)

  // local state
  const [deletePEPModal, setDeletePEPModal] = useState(false)
  const [pepToDelete, setPepToDelete] = useState('')
  const [confrimBoxText, setConfirmBoxText] = useState('')
  const [addPEPModal, setAddPEPModal] = useState(false)

  if (namespace === undefined || isLoadingNamespace || isLoadingNamespaceInfo) {
    return (
      <PageLayout>
        <div
          className="d-flex flex-col align-items-center justify-content-center"
          style={{ height: '90vh' }}
        >
          <h1 className="animate-pulse text-muted">Loading namespace...</h1>
        </div>
      </PageLayout>
    )
  }
  if (error) {
    return (
      <PageLayout>
        <h1>Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </PageLayout>
    )
  }

  return (
    <PageLayout title={`pephub | ${user?.data.login}`}>
      <div className="d-flex flex-row align-items-center justify-content-between mt-3">
        <h1 className="fw-bold">{namespace}</h1>
        <div>
          {user?.data.login === namespace ? (
            <>
              <Button variant="outline-primary" className="ms-1">
                <i className="bi bi-hdd-stack"></i> API Endpoints
              </Button>
              <Button
                onClick={() => setAddPEPModal(true)}
                variant="outline-success"
                className="ms-1"
              >
                <i className="bi bi-plus-circle"></i> Add PEP
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <div className="pb-2 border-bottom border-dark">
        <span className="fw-bold">Total Projects:</span>{' '}
        {namespaceInfo?.number_of_projects}
        <br />
        <span className="fw-bold">Total Samples:</span>{' '}
        {namespaceInfo?.number_of_samples}
      </div>
      <div>
        {namespaceProjects?.items.map((project, i) => (
          <div className="my-2" key={i}>
            <ProjectCard
              setPEPToDelete={(v: string) => setPepToDelete(v)}
              setDeletePEPModal={(v: boolean) => setDeletePEPModal(v)}
              {...project}
            />
          </div>
        ))}
      </div>
      <DeletePEPModal
        deletePEPModal={deletePEPModal}
        setDeletePEPModal={setDeletePEPModal}
        pepToDelete={pepToDelete}
        setPepToDelete={setPepToDelete}
        confrimBoxText={confrimBoxText}
        setConfirmBoxText={setConfirmBoxText}
      />
      <AddPEPModal addPEPModal={addPEPModal} setAddPEPModal={setAddPEPModal} />
    </PageLayout>
  )
}

export default NamespacePage
