import { FC } from 'react'
import { Badge, Button, ButtonGroup, Dropdown } from 'react-bootstrap'

interface Props {
  namespace: string
  name: string
  tag: string
  is_private: boolean
  number_of_samples: number
  description: string
  last_update_date: string
  submission_date: string
  digest: string
  setDeletePEPModal: (value: boolean) => void
  setPEPToDelete: (value: string) => void
}

export const ProjectCard: FC<Props> = ({
  namespace,
  name,
  tag,
  is_private,
  number_of_samples,
  description,
  submission_date,
  digest,
  setDeletePEPModal,
  setPEPToDelete,
}) => {
  return (
    <div className="border border-dark p-2 shadow-sm rounded">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <span className="h4 text-primary fw-bold mb-0">
            <a
              className="text-decoration-none"
              href={`/${namespace}/${name}?tag=${tag}`}
            >
              {namespace}/{name}:{tag}
            </a>
          </span>
          {is_private ? (
            <Badge className="ms-2" pill bg="danger">
              <i className="bi bi-lock"></i>
              Private
            </Badge>
          ) : null}
        </div>
        <Dropdown as={ButtonGroup}>
          <Button disabled size="sm" variant="outline-primary" className="ms-1">
            <i className="bi bi-star"></i> Favorite
          </Button>
          <Dropdown.Toggle split variant="outline-primary" />
          <Dropdown.Menu>
            <Dropdown.Item href="#">View</Dropdown.Item>
            <Dropdown.Item href="#">Edit</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              className="text-danger"
              onClick={() => {
                setPEPToDelete(`${namespace}/${name}:${tag}`)
                setDeletePEPModal(true)
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <p className="fw-bold mb-0">
        No. of samples: <span className="fw-normal">{number_of_samples}</span>
      </p>
      <p className="mb-3">
        {description || (
          <span className="text-secondary fst-italic">No description</span>
        )}
      </p>
      <div className="text-muted d-flex flex-row align-items-center">
        <small>
          <i className="bi bi-calendar3 me-1"></i> Created:
          <span className="ms-1">
            {new Date(submission_date).toLocaleDateString({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </small>
        <small>
          <div className="ms-3">{digest}</div>
        </small>
      </div>
    </div>
  )
}
