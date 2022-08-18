import { Text } from '@chakra-ui/react'
import { FC } from 'react'
import { Layout } from '../components/layout/Layout'

const About: FC = () => {
  return (
    <Layout title="About">
      <Text fontSize="6xl" fontWeight="bold">
        About PEPhub
      </Text>
      <Text fontSize="xl">Here is some info about PEPhub. Yay!</Text>
    </Layout>
  )
}
export default About
