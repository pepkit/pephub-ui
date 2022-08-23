import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useNamespace } from '../../api/queries'
import { Layout } from '../../components/layout/Layout'

const Namespace: FC = () => {
  const router = useRouter()
  const { data, error, isLoading } = useNamespace(router.query.namespace)
  if (error) {
    return <Box>{JSON.stringify(error, null, 2)}</Box>
  }
  return (
    <Layout>
      <Box w="full">
        <Skeleton isLoaded={!isLoading} w="full">
          <Text fontSize="6xl" fontWeight="bold">
            {data?.namespace}
          </Text>
        </Skeleton>
        <Skeleton my="2" isLoaded={!isLoading} w="full">
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
      <Box w="full">
        <TableContainer w="full">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Project name</Th>
                <Th>No. of samples</Th>
                <Th>Description</Th>
                <Th>Link</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.projects.map((p) => (
                <Tr key={p.id}>
                  <Td>{p.name}</Td>
                  <Td>{p.n_samples}</Td>
                  <Td>{p.description || 'No description'}</Td>
                  <Td>{`/${data.namespace}/${p.name}`}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  )
}

export default Namespace
