import { useRouter } from 'next/router'
import { PageLayout } from '@/components/layout/page-layout'
import { NextPage } from 'next'
import { useNamespaceProjects } from '@/hooks/useNamespaceProjects'
import { Button, Form, Spinner } from 'react-bootstrap'
import { useSession } from 'next-auth/react'
import { useUser } from '@/hooks/useUser'
import { useNamespace } from '@/hooks/useNamespace'
import { ProjectCard } from '@/components/projects/project-card'
import { useState } from 'react'
import { DeletePEPModal } from '@/components/modals/delete-modal'
import { AddPEPModal } from '@/components/modals/add-modal'
import { NamespaceEndpointsModal } from '@/components/modals/namespace-endpoints'
import { useDebounce } from '@/hooks/useDebounce'

const NamespacePage: NextPage = () => {
  // query things
  const router = useRouter()
  const { namespace } = router.query

  // user and session
  const { data: session } = useSession()
  const { data: user } = useUser(session?.user?.name, session !== null)

  // search things
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(5)
  const [offset, setOffset] = useState(0)
  const debouncedSearch = useDebounce(search, 500)

  // namespace things
  const {
    data: namespaceProjects,
    isLoading: isLoadingNamespaceProjects,
    error,
  } = useNamespaceProjects(namespace, {
    query: debouncedSearch,
    limit: limit,
    offset: offset,
  })
  const { data: namespaceInfo, isLoading: isLoadingNamespaceInfo } =
    useNamespace(namespace)

  // local state
  const [deletePEPModal, setDeletePEPModal] = useState(false)
  const [pepToDelete, setPepToDelete] = useState('')
  const [confrimBoxText, setConfirmBoxText] = useState('')
  const [addPEPModal, setAddPEPModal] = useState(false)
  const [namespaceEndpointsModal, setNamespaceEndpointsModal] = useState(false)

  if (namespace === undefined || isLoadingNamespaceInfo) {
    return (
      <PageLayout>
        <div
          className="d-flex flex-col align-items-center justify-content-center"
          style={{ height: '90vh' }}
        >
          <h1 className="animate-pulse">Loading namespace...</h1>
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
              <Button
                onClick={() => setNamespaceEndpointsModal(true)}
                variant="outline-primary"
                className="ms-1"
              >
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
      <div className="d-flex flex-row align-items-center  mt-2">
        <div className="input-group">
          <span className="input-group-text">Search</span>
          <Form.Control
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder={`Search for PEPs in ${namespace}`}
          />
        </div>
        <div className="input-group w-25 ms-2">
          <span className="input-group-text">Limit</span>
          <select
            className="form-select mb-0"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div>
        {isLoadingNamespaceProjects ? (
          <div className="py-5 d-flex flex-column align-items-center justify-content-center">
            <div>
              <h4 className="animate-pulse">Fetching projects...</h4>
            </div>
            <div>
              <Spinner animation="border">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </div>
        ) : (
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
            {/*  pagination things */}
            {namespaceProjects?.count > namespaceProjects?.items.length ? (
              <div className="d-flex flex-row align-items-center justify-content-center">
                <Button
                  variant="link"
                  onClick={() => setOffset(0)}
                  disabled={offset === 0}
                >
                  First
                </Button>
                <Button
                  variant="link"
                  disabled={offset === 0}
                  onClick={() => setOffset(offset - 1)}
                >
                  <i className="bi bi-arrow-left"></i>
                  Previous
                </Button>
                <Button
                  variant="link"
                  onClick={() => setOffset(offset + 1)}
                  disabled={offset >= namespaceProjects?.count - limit}
                >
                  Next
                  <i className="bi bi-arrow-right"></i>
                </Button>
                <Button
                  variant="link"
                  onClick={() => setOffset(namespaceProjects?.count - limit)}
                  disabled={offset >= namespaceProjects?.count - limit}
                >
                  Last
                </Button>
              </div>
            ) : null}
          </div>
        )}
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
      <NamespaceEndpointsModal
        namespaceEndpointsModal={namespaceEndpointsModal}
        setNamespaceEndpointsModal={setNamespaceEndpointsModal}
      />
    </PageLayout>
  )
}

export default NamespacePage
