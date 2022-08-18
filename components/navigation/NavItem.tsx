import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  to?: string
  disabled?: boolean
  children: React.ReactNode
}

export const NavItem: FC<Props> = (props) => {
  const { to, disabled, children } = props
  return (
    <Link href={to || ''}>
      <Button disabled={disabled}>{children}</Button>
    </Link>
  )
}
