import { FC } from 'react'
import { Modal, Button } from 'react-bootstrap'

interface Props {
  deletePEPModal: boolean
  setDeletePEPModal: (value: boolean) => void
  pepToDelete: string
  setPepToDelete: (value: string) => void
  confrimBoxText: string
  setConfirmBoxText: (value: string) => void
}

export const DeletePEPModal: FC<Props> = ({
  deletePEPModal,
  setDeletePEPModal,
  pepToDelete,
  setPepToDelete,
  confrimBoxText,
  setConfirmBoxText,
}) => {
  return (
    <Modal
      animation={false}
      show={deletePEPModal}
      onHide={() => {
        setConfirmBoxText('')
        setPepToDelete('')
        setDeletePEPModal(false)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Delete <span className="fw-bold">{pepToDelete}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this PEP? This action cannot be undone.
        To confirm, type <span className="fw-bold">{pepToDelete}</span> in the
        box below:
        <input
          value={confrimBoxText}
          onChange={(e) => setConfirmBoxText(e.target.value)}
          className="form-control mt-2"
          placeholder={pepToDelete}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => {
            setDeletePEPModal(false)
            setConfirmBoxText('')
            setPepToDelete('')
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={confrimBoxText !== pepToDelete}
          variant="danger"
          onClick={() => setDeletePEPModal(false)}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
