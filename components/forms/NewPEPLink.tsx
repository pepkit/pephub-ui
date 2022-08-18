import { ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface SuccessfulUpload {
  namespace: string
  project_name: string
  proj: object
  config_file: string
  other_files: string
}

interface Props {
  pep: SuccessfulUpload
  onClick: () => void
}

export const NewPEPLink: FC<Props> = (props) => {
  const { pep, onClick } = props

  const router = useRouter()
  const routeToNewPEP = () => {
    onClick()
    router.push(`/${pep.namespace}/${pep.project_name}`)
  }
  return (
    <Flex
      p={2}
      border={'1px'}
      rounded="md"
      shadow="md"
      direction="row"
      alignItems="center"
      justifyContent="center"
      w="full"
    >
      <CheckIcon color="green" mr={2} />
      <Text mr={5}>
        Success!{' '}
        <span className="font-bold">{`${pep.namespace}/${pep.project_name}`}</span>{' '}
        created.
      </Text>
      <Button
        onClick={routeToNewPEP}
        size="sm"
        colorScheme="green"
        rightIcon={<ArrowForwardIcon />}
      >
        View PEP now
      </Button>
    </Flex>
  )
}
