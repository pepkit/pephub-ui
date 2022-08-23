import {
  ButtonGroup,
  Button,
  Text,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Skeleton,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { MdArrowForward } from 'react-icons/md'
import { useAllPEPs } from '../api/queries'
import { Layout } from '../components/layout/Layout'

const Home: NextPage = () => {
  const { data: allPEPs, isLoading: isLoadingAllPEPs } = useAllPEPs()
  return (
    <Layout>
      <div className="py-8">
        <Text fontSize="6xl" fontWeight="bold">
          Welcome to PEPhub
        </Text>
        <Text fontSize="xl" maxWidth="4xl">
          PEPhub is a metadata server that stores and serves Portable
          Encapsulated Projects (PEPs). PEPhub acts as a central server to
          dramatically increase the FAIRness of sample metadata by making them
          more accessible, discoverable, and reusable. Here you may browse PEPs
          in the database or even submit new PEPs you may have.
        </Text>
        <ButtonGroup my="4">
          <Link href="/submit">
            <Button size="lg" colorScheme="blue" rightIcon={<MdArrowForward />}>
              Submit PEP
            </Button>
          </Link>
        </ButtonGroup>
      </div>
      <Box w="full">
        <Text fontSize="4xl" fontWeight="bold" mb={2}>
          Namespaces in PEPhub:
        </Text>
        <Skeleton isLoaded={!isLoadingAllPEPs} height="80px" w="full">
          <TableContainer w="full">
            <Table variant="simple" size="sm">
              <Thead fontWeight="bold">
                <Tr>
                  <Th>Namespace</Th>
                  <Th>No. of projects</Th>
                  <Th>No. of samples</Th>
                  <Th>API Endpoint</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allPEPs?.namespaces.map((n) => (
                  <Tr key={n.namespace}>
                    <Td fontWeight="bold">{n.namespace}</Td>
                    <Td>{n.n_projects}</Td>
                    <Td>{n.n_samples}</Td>
                    <Td>
                      <Link href={`${n.namespace}`}>
                        <Button
                          size="sm"
                          colorScheme="gray"
                          border={'1px'}
                          borderColor="black"
                        >
                          More info
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Skeleton>
      </Box>
    </Layout>
  )
}

export default Home
