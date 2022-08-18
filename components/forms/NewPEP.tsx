import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useNamespaces } from '../../api/queries'
import { FileUploadButton } from './FileUpload'
import { NewNamespaceForm } from './NewNamespace'
import { NewPEPLink } from './NewPEPLink'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export interface NewPEPFormValues {
  namespace: string
  project: string
  tag: string
}

export interface EnrichedFormData extends NewPEPFormValues {
  config_file: File
  other_files: File[]
}

export const NewPEPForm: FC = () => {
  const toast = useToast()

  const { data: namespaces, isFetching } = useNamespaces()
  const [namespace, setNamespace] = useState<string>('')
  const [projectName, setProjectName] = useState<string>('')
  const [configFile, setConfigFile] = useState<File[]>([])
  const [otherFiles, setOtherFiles] = useState<File[]>([])
  const [newNamespaceOpen, setNewNamespaceOpen] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setSubmitting(true)
    const formData = new FormData()

    // verify project name
    if (projectName !== '') {
      formData.append('project_name', projectName)
    } else {
      alert('Please specify a project name!')
      return
    }

    // attach files
    formData.append('config_file', configFile[0])
    otherFiles.forEach((f) => formData.append('other_files', f))

    // verify namespace
    if (namespace !== '') {
      try {
        const res = await axios.post(
          `${API_BASE}/pep/${namespace}/submit`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        const data = await res.data
        toast({
          render: () => <NewPEPLink pep={data} onClick={toast.closeAll} />,
          position: 'bottom',
          isClosable: true,
        })
      } catch (err) {
        alert(err)
      } finally {
        setSubmitting(false)
      }
    } else {
      alert('Please specify namespace!')
      return
    }
  }

  return (
    <Box border="1px" rounded="md" p="4" boxShadow="md" w="full">
      <form className="w-full" onSubmit={handleSubmit}>
        <FormControl>
          <Box as="section" mb="6">
            <FormLabel fontSize="xl" fontWeight="bold">
              1. Select namespace and project name
            </FormLabel>
            <Flex alignItems="center" my="2">
              <Button
                disabled
                colorScheme="green"
                mr="1"
                onClick={() => setNewNamespaceOpen(true)}
              >
                <AddIcon />
              </Button>
              <Select
                mx="1"
                placeholder="Select namespace"
                id="namespace"
                name="namespace"
                value={namespace}
                onChange={(e) => setNamespace(e.target.value)}
              >
                {isFetching ? (
                  <option className="italic">Loading...</option>
                ) : (
                  namespaces?.namespaces.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))
                )}
              </Select>
              <Text fontSize="2xl">/</Text>
              <Input
                id="project"
                name="project"
                ml="1"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <Text fontSize="2xl" ml="1">
                :
              </Text>
              <Input id="tag" name="tag" ml="1" placeholder="latest" />
            </Flex>
          </Box>
          <Box as="section" mb="3">
            <FormLabel fontSize="xl" fontWeight="bold">
              2. Select Config File
            </FormLabel>
            <FileUploadButton
              name="files"
              id="files"
              buttonProps={{ colorScheme: 'blue' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files
                if (files && files.length) {
                  setConfigFile([...Array.from(files)])
                }
              }}
              files={configFile}
            >
              Select File
            </FileUploadButton>
          </Box>
          <Box as="section" mb="3">
            <FormLabel fontSize="xl" fontWeight="bold">
              3. Select Other Files
            </FormLabel>
            <FileUploadButton
              name="other-files"
              id="other-files"
              buttonProps={{ colorScheme: 'blue' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files
                if (files && files.length) {
                  setOtherFiles([...Array.from(files)])
                }
              }}
              files={otherFiles}
              multiple
            >
              Select Files
            </FileUploadButton>
          </Box>
          {/* <Box as="section" mb="6">
            <FormLabel fontSize="xl" fontWeight="bold">
              3. Validate
            </FormLabel>
            <Box>
              <Text fontStyle="italic">PEP will be validated here...</Text>
            </Box>
          </Box> */}
        </FormControl>
        <Box mt="4">
          <Button
            disabled={submitting}
            float="right"
            type="submit"
            colorScheme="green"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </form>
      {/* New Namespace Modal */}
      <Modal
        isOpen={newNamespaceOpen}
        onClose={() => setNewNamespaceOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Namespace</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewNamespaceForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
