import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useNamespace } from '../../api/queries'
import { Layout } from '../../components/layout/Layout'
import { ProjectCard } from '../../components/projects/ProjectCard'

const Namespace: FC = () => {
  const router = useRouter()
  const { data, error, isFetching } = useNamespace(router.query.namespace)
  if (error) {
    return <Box>{JSON.stringify(error, null, 2)}</Box>
  }
  return (
    <Layout>
      <Box w="full">
        <Skeleton isLoaded={!isFetching} w="full">
          <Text fontSize="6xl" fontWeight="bold">
            {data?.namespace}
          </Text>
        </Skeleton>
        <Skeleton my="2" isLoaded={!isFetching} w="full">
          <Flex fontSize="2xl">
            <Text fontWeight="bold" mr="1">
              No. Samples:
            </Text>
            <Text>{data?.n_samples}</Text>
          </Flex>
          <Flex fontSize="2xl">
            <Text fontWeight="bold" mr="1">
              No. Projects:
            </Text>
            <Text>{data?.n_projects}</Text>
          </Flex>
        </Skeleton>
        <Flex py="2" justifyContent="end" borderBottom="1px" borderColor="gray">
          <ButtonGroup>
            <Button size="lg" colorScheme="green">
              Add PEP
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
      <Box>
        <Flex wrap="wrap">
          {data?.projects.map((p, i) => (
            <ProjectCard
              key={i}
              namespace={data.namespace}
              name={p.name}
              n_samples={p.n_samples}
              description={p.description}
            />
          ))}
        </Flex>
      </Box>
    </Layout>
  )
}

export default Namespace
