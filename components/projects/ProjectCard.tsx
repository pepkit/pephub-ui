import { Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  namespace: string
  name: string
  description: string | null
  n_samples: number
}

export const ProjectCard: FC<Props> = (props) => {
  const { name, n_samples, description, namespace } = props
  return (
    <Link href={`/${namespace}/${name}`}>
      <Box
        border="2px"
        borderColor="black"
        p="2"
        rounded="md"
        my="2"
        boxShadow="md"
        w="full"
        cursor="pointer"
        transition="all"
        mr={2}
        _hover={{
          boxShadow: 'sm',
          borderColor: 'blue.400',
        }}
      >
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
        {description ? (
          <Text>{description}</Text>
        ) : (
          <Text fontStyle="italic">No description provided.</Text>
        )}
        <Flex>
          <Text fontWeight="bold" mr="1">
            No. Samples
          </Text>
          <Text>{n_samples}</Text>
        </Flex>
      </Box>
    </Link>
  )
}
