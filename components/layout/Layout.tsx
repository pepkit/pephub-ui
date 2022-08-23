import { FC } from 'react'
import { Navbar } from '../navigation/Navbar'
import { SEO } from './SEO'
import { useVersions } from '../../api/queries'
import { Box, Flex, Skeleton } from '@chakra-ui/react'
import { VersionTag } from './VersionTag'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
  title?: string
  description?: string
}

export const Layout: FC<Props> = (props) => {
  const { title, description, children } = props
  const { data: versions, isLoading: isLoadingVersions } = useVersions()
  return (
    <div className="flex flex-col items-center min-h-screen px-4 border">
      <SEO title={title} description={description} />
      <Navbar />
      <main className="flex flex-col items-start flex-1 w-full max-w-6xl">
        {children}
      </main>
      <Box as="footer" py={5} w="full" className="max-w-6xl">
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <div>
            <Skeleton isLoaded={!isLoadingVersions}>
              {versions ? (
                <Flex direction="row" alignItems="center">
                  <VersionTag
                    name="pephub"
                    version={versions?.pephub_version}
                  />
                  <VersionTag name="peppy" version={versions?.peppy_version} />
                  <VersionTag
                    name="python"
                    version={versions?.python_version}
                  />
                </Flex>
              ) : (
                <div></div>
              )}
            </Skeleton>
          </div>
          <Link href="http://databio.org">
            <a>
              <Image
                alt="pephub logo"
                src={'/databio_logo.svg'}
                height="50"
                width="200"
              />
            </a>
          </Link>
        </Flex>
      </Box>
    </div>
  )
}
