import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { NewPEPForm } from '../components/forms/NewPEP'
import { Layout } from '../components/layout/Layout'

const Submit: FC = () => {
  return (
    <Layout title="Submit a PEP">
      <Box mb="2">
        <Text fontWeight="bold" fontSize="6xl">
          Submit a PEP
        </Text>
        {/* <Text fontSize="xl">
          Submit a new PEP to an existing namespace in the database, or create a
          new namespace to submit to.
        </Text> */}
      </Box>
      <NewPEPForm />
    </Layout>
  )
}

export default Submit
