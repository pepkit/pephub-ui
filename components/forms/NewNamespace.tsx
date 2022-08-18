import { Button, Flex, FormControl, Input } from '@chakra-ui/react'
import { FC } from 'react'

export const NewNamespaceForm: FC = () => {
  return (
    <div>
      <form>
        <FormControl>
          <Flex mb="3">
            <Input
              id="namespace"
              name="namespace"
              placeholder="Select namespace name"
              mr="3"
            />
            <Button type="submit" colorScheme="green">
              Add
            </Button>
          </Flex>
        </FormControl>
      </form>
    </div>
  )
}
