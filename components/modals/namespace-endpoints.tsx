import { useRouter } from 'next/router'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

interface Props {
  namespaceEndpointsModal: boolean
  setNamespaceEndpointsModal: (value: boolean) => void
}

export const NamespaceEndpointsModal: FC<Props> = ({
  namespaceEndpointsModal,
  setNamespaceEndpointsModal,
}) => {
  const router = useRouter()
  // get the last part of the url
  const namespace = router.asPath.split('/').pop()
  return (
    <Modal
      animation={false}
      show={namespaceEndpointsModal}
      onHide={() => {
        setNamespaceEndpointsModal(false)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>API Endpoints Available</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <span className="badge rounded-full bg-primary text-white">GET</span>{' '}
          <span>
            <a
              className="ms-1 text-decoration-none fw-bold"
              href={`${API_BASE}/namespaces/${namespace}`}
            >
              /api/v1/namespaces/{namespace}
            </a>
          </span>
        </p>
        <p className="mb-0">
          <span className="badge rounded-full bg-primary text-white">GET</span>{' '}
          <span>
            <a
              className="ms-1 text-decoration-none fw-bold"
              href={`${API_BASE}/namespaces/${namespace}/projects`}
            >
              /api/v1/namespaces/{namespace}/projects
            </a>
          </span>
        </p>
      </Modal.Body>
    </Modal>
  )
}
