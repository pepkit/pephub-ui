import { FC } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-yaml'
import 'prismjs/themes/prism-dark.css' //Example style, you can use another
import { Box } from '@chakra-ui/react'

interface Props {
  code: string
  onChange: (code: string) => void
}

export const PEPEditor: FC<Props> = (props) => {
  const { code, onChange } = props
  return (
    <Box border="1px" rounded="md" minH="96">
      <Editor
        value={code}
        onValueChange={(code) => onChange(code)}
        highlight={(code) => highlight(code, languages.yaml, 'yaml')}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
        }}
      />
    </Box>
  )
}
