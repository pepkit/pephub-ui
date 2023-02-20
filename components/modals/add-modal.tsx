import { useUser } from '@/hooks/useUser'
import { FC, useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

interface Props {
  addPEPModal: boolean
  setAddPEPModal: (value: boolean) => void
}

export const AddPEPModal: FC<Props> = ({ addPEPModal, setAddPEPModal }) => {
  const { data: user } = useUser()
  const [isPrivate, setIsPrivate] = useState('')
  const [namespace, setNamespace] = useState('')
  const [name, setName] = useState('')
  const [tag, setTag] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)

  const resetForm = () => {
    setIsPrivate('')
    setNamespace('')
    setName('')
    setTag('')
  }

  useEffect(() => {
    // detect if the btn should be disabled or not
    if (namespace !== '' && name !== '' && tag !== '') {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [namespace, name, tag])

  return (
    <Modal
      size="lg"
      animation={false}
      show={addPEPModal}
      onHide={() => {
        setAddPEPModal(false)
        resetForm()
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add PEP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="switch"
            label="Private"
            value={isPrivate}
            onChange={(e) => setIsPrivate(e.target.value)}
          />
          <div className="mt-2 d-flex flex-row align-items-center">
            <Form.Select
              value={namespace}
              onChange={(e) => setNamespace(e.target.value)}
            >
              <option value="">Select Namespace</option>
              <option value={user?.data.login}>{user?.data.login}</option>
            </Form.Select>
            <span className="mx-1 h4">/</span>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
            />
            <span className="mx-1 h4">:</span>
            <Form.Control
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="default"
            />
          </div>
          {/* drag n drop file form */}
          <div className="p-5 rounded mt-2 dnd-border d-flex flex-column align-items-center justify-content-center">
            <i className="bi bi-cloud-upload me-1"></i>
            <span className="text-muted">Drag and drop files here</span>
            <span className="text-muted">or</span>
            <Button variant="outline-secondary" className="mt-2">
              <i className="bi bi-folder me-1"></i>
              Select files
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setAddPEPModal(false)
            resetForm()
          }}
          variant="outline-secondary"
        >
          Cancel
        </Button>
        <Button variant="success" disabled={true}>
          <i className="bi bi-plus-circle me-1"></i>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
