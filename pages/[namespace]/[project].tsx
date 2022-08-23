import { stringify } from 'yaml'
import { DownloadIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonText,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useProject } from '../../api/queries'
import { Layout } from '../../components/layout/Layout'
import { SampleTable } from '../../components/samples/SampleTable'
import { PEPEditor } from '../../components/forms/PEPEditor'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { namespace, project } = context.query
  let status_code
  try {
    const res = await axios.get(`${API_BASE}/pep/${namespace}/${project}`)
    status_code = res.status
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      status_code = err.response.status
    }
  }

  return {
    props: {
      projectNotFound: status_code == 404,
      project_name: project,
      namespace: namespace,
    },
  }
}

interface PageProps {
  projectNotFound: boolean
  project_name: string
  namespace: string
}

const Project: FC<PageProps> = ({
  projectNotFound,
  project_name,
  namespace,
}) => {
  const router = useRouter()
  const sendHome = () => {
    router.push('/')
  }
  const sendToGithub = () => {
    router.push('https://github.com/pepkit/pephub')
  }

  const { data: projectInfo, isLoading } = useProject(
    namespace,
    project_name,
    !projectNotFound
  )

  const [projectConfig, setProjectConfig] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)

  useEffect(() => {
    if (projectInfo !== undefined) {
      setProjectConfig(stringify(projectInfo.pep))
    }
  }, [projectInfo])

  if (projectNotFound) {
    return (
      <Layout title="Page not found">
        <Flex p={5} w="full" direction="column" alignItems="center">
          <Text fontWeight="bold" fontSize="4xl">
            Project{' '}
            <span className="text-blue-500">
              {'"'}
              {`${namespace}/${project_name}`}
              {'"'}
            </span>{' '}
            not found!
          </Text>
          <div className="my-2"></div>
          <Text fontSize="xl">Are you sure you spelled it right?</Text>
          <div className="my-2"></div>
          <Box>
            <Button onClick={sendHome} colorScheme="blue" mx={2}>
              Home
            </Button>
            <Button
              onClick={sendToGithub}
              colorScheme="gray"
              mx={2}
              borderColor="black"
              border="1px"
            >
              GitHub
            </Button>
          </Box>
        </Flex>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Box w="full" my={4} py={4} borderBottom="1px" borderColor="gray">
          <SkeletonText spacing={6} isLoaded={!isLoading}>
            <Flex direction="row" alignItems="center">
              <Text fontSize="4xl" fontWeight="bold">
                {`${namespace}/${project_name}`}{' '}
              </Text>
              <span className="px-3 mx-4 text-base text-white bg-black border-2 border-black rounded-full">
                PEP Version {projectInfo?.pep_version}
              </span>
            </Flex>
            <Text fontStyle="italic" mb={2}>
              Project has no description.
            </Text>
            <Text mb={2}>
              <span className="font-bold">No. samples:</span>{' '}
              {projectInfo?.samples.length}
            </Text>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontStyle="italic" color="gray">
                <span>Project created: August, 17th, 2022</span>
              </Text>
              <Box>
                <Link href={`${API_BASE}/pep/${namespace}/${project_name}/zip`}>
                  <Button
                    mr={2}
                    rightIcon={<DownloadIcon />}
                    colorScheme="blue"
                    borderColor="black"
                    border={'1px black solid'}
                  >
                    Download
                  </Button>
                </Link>
                <Button
                  mr={2}
                  rightIcon={<EditIcon />}
                  colorScheme="gray"
                  borderColor="black"
                  border={'1px'}
                  onClick={() => setEditorOpen(true)}
                >
                  Edit PEP
                </Button>
              </Box>
            </Flex>
          </SkeletonText>
        </Box>
        <Skeleton
          height="60px"
          isLoaded={!isLoading || projectInfo === undefined}
        >
          {projectInfo ? (
            <>
              <Text fontSize="2xl" fontWeight="bold" mb={2}>
                Sample table:
              </Text>
              <SampleTable
                samples={projectInfo?.samples}
                sampleTableIndx={projectInfo.sample_table_indx}
                sampleAttributes={projectInfo.sample_attributes}
              />
            </>
          ) : (
            <div></div>
          )}
        </Skeleton>
        <Modal
          size="xl"
          isOpen={editorOpen}
          onClose={() => setEditorOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Editing{' '}
              <span className="font-bold">{`${namespace}/${project_name}`}</span>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <PEPEditor
                code={projectConfig}
                onChange={(code: string) => setProjectConfig(code)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => setEditorOpen(false)}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditorOpen(false)
                  setProjectConfig(stringify(projectInfo?.pep))
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    )
  }
}
export default Project
