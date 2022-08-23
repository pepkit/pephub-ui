import { Tag, TagLabel } from '@chakra-ui/react'
import { FC } from 'react'

interface Props {
  name: string
  version: string
  colorScheme?: string
}

export const VersionTag: FC<Props> = (props) => {
  const { name, version, colorScheme } = props
  const mappedColorScheme = colorScheme || 'blue'
  return (
    <Tag
      mr={2}
      colorScheme={mappedColorScheme}
      borderRadius="full"
      size="sm"
      variant="solid"
      fontWeight="bold"
    >
      <TagLabel mr={1}>{name}</TagLabel>
      <TagLabel>{version}</TagLabel>
    </Tag>
  )
}
