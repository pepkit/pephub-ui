import { ButtonGroup, Button, Text, FormControl } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { MdArrowForward } from 'react-icons/md'
import { Layout } from '../components/layout/Layout'
import { PEPSearch } from '../components/search/PEPSearch'

const Home: NextPage = () => {
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
      <Text fontSize="4xl" fontWeight="bold">
        ...or, search for PEPs
      </Text>
      <FormControl>
        <PEPSearch />
      </FormControl>
    </Layout>
  )
}

export default Home
