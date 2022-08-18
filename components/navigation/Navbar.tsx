import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const Navbar: FC = () => {
  return (
    <Box as="nav" width={'full'} py="4">
      <Container maxWidth="6xl" p="0">
        <Flex alignItems="center" justifyContent="space-between" width="full">
          <Link href="/">
            <div className="flex flex-row items-center mr-8 cursor-pointer">
              <Image
                alt="pephub logo"
                src={'/pephub_logo.svg'}
                height="50"
                width="50"
              />
              <Text fontSize="2xl" ml="2" fontWeight="bold">
                pephub
              </Text>
            </div>
          </Link>
          <div>
            <ButtonGroup
              variant="link"
              spacing={10}
              mr="14"
              colorScheme="black"
            >
              {[
                { title: 'About', href: '/about' },
                { title: 'GitHub', href: 'https://github.com/pepkit/pephub' },
                { title: 'Submit', href: '/submit' },
              ].map((l) => (
                <Link key={l.href} href={l.href}>
                  <Button>{l.title}</Button>
                </Link>
              ))}
            </ButtonGroup>
            <ButtonGroup spacing={5}>
              <Button disabled colorScheme="blue">
                Sign In
              </Button>
              <Button disabled variant="link" colorScheme="blue">
                Sign Up
              </Button>
            </ButtonGroup>
          </div>
        </Flex>
      </Container>
    </Box>
  )
}
