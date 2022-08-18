import { FC } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { Sample } from './Sample'

interface Props {
  sampleAttributes: string[]
  sampleTableIndx: string
  samples: Sample[]
}

export const SampleTable: FC<Props> = (props) => {
  const { samples, sampleTableIndx, sampleAttributes } = props
  return (
    <TableContainer w="full">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{sampleTableIndx}</Th>
            {/* map sample attributes */}
            {Object.keys(samples[0]).map((k) => (
              <Th key={k}>{k}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {samples.map((s, i) => (
            <Tr key={i}>
              {/* insert sample table index col */}
              <Td>{JSON.stringify(s[sampleTableIndx], null, 2)}</Td>

              {/* map rest of cols */}
              {sampleAttributes.map((a) => (
                <Td key={a}>{JSON.stringify(s[a], null, 2)}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
