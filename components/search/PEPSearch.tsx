import { Box, Text } from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useAllPEPs } from '../../api/queries'

interface Project {
  id: number
  description: string | null
  digest: string
  name: string
  n_samples: number
}

interface Item {
  value: string
  project: Project
  label: string
}

export const PEPSearch: FC = () => {
  const router = useRouter()
  const [pickerItems, setPickerItems] = useState<Item[]>([])
  const { data: allPEPs, isFetching } = useAllPEPs()

  const customItemRender = (item: Item) => {
    return (
      <Box cursor="pointer">
        <Text>{item.label}</Text>
      </Box>
    )
  }

  useEffect(() => {
    if (allPEPs) {
      const items = [] as Item[]
      allPEPs.namespaces.forEach((n) => {
        items.push(
          ...n.projects.map((p) => ({
            value: `/${n.namespace}/${p.name}`,
            project: p,
            label: `${n.namespace}/${p.name}`,
          }))
        )
      })
      setPickerItems(items)
    }
  }, [allPEPs])

  return (
    <CUIAutoComplete
      items={pickerItems}
      placeholder={isFetching ? 'Loading...' : 'Type to search.'}
      label={'Search for PEPs'}
      onSelectedItemsChange={(changes) => {
        if (changes.selectedItems && changes.selectedItems[0]) {
          router.push(changes.selectedItems[0].value)
        }
      }}
      itemRenderer={customItemRender}
      listStyleProps={{ maxH: '300px', overflow: 'scroll' }}
      disableCreateItem
    />
  )
}
