import { MdFileUpload } from 'react-icons/md'
import { Button, ButtonProps, Flex, InputGroup, Text } from '@chakra-ui/react'
import { ChangeEvent, FC, ReactNode, useRef } from 'react'

interface FileUploadButtonProps {
  name: string
  id: string
  multiple?: boolean
  accept?: string
  children?: ReactNode
  buttonProps?: ButtonProps
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  files: File[]
}

interface FileLabelProps {
  files: File[]
}

const FileLabel: FC<FileLabelProps> = (props) => {
  const { files } = props
  if (files) {
    return (
      <>
        {files.length > 1 ? (
          <Text fontSize="lg">{files.length} files selected.</Text>
        ) : (
          <Text fontSize="lg">{files[0]?.name}</Text>
        )}
      </>
    )
  } else {
    return <Text fontSize="lg">No file selected.</Text>
  }
}

// adapted from: https://gist.github.com/Sqvall/23043a12a7fabf0f055198cb6ec39531
export const FileUploadButton: FC<FileUploadButtonProps> = (props) => {
  const { name, id, multiple, accept, children, buttonProps, onChange, files } =
    props

  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleClick = () => inputRef.current?.click()

  return (
    <InputGroup>
      <Flex alignItems="center">
        <input
          name={name}
          id={id}
          type="file"
          multiple={multiple || false}
          hidden
          accept={accept}
          ref={(e) => {
            inputRef.current = e
          }}
          onChange={onChange}
        />
        <Button
          onClick={handleClick}
          leftIcon={<MdFileUpload />}
          mr={3}
          {...buttonProps}
        >
          {children}
        </Button>
        <>
          <FileLabel files={files} />
        </>
      </Flex>
    </InputGroup>
  )
}
