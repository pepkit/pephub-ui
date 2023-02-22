import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Container } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { SITE_CONSTS } from '@/data/const'
import jwt from 'jsonwebtoken'

import Link from 'next/link'

const LoginSuccess: NextPage = () => {
  const router = useRouter()
  const [, setCookie] = useCookies([SITE_CONSTS.jwt_storage_key])
  const { token } = router.query

  useEffect(() => {
    if (token && setCookie !== undefined) {
      const d = new Date()
      const seconds = d.getTime() / 1000
      const jwt_decoded = jwt.decode(token as string)

      // set token in local storage
      if (jwt_decoded && typeof jwt_decoded !== 'string') {
        setCookie(SITE_CONSTS.jwt_storage_key, token, {
          expires: new Date((jwt_decoded.exp || seconds) * 1000),
        })
      } else {
        alert('Invalid token recieved')
        router.push('/')
      }

      // redirect to home page
      router.push('/')
    }
  }, [token, setCookie, router])

  return (
    <Container className="py-5 d-flex flex-column align-items-center justify-content-center">
      <h1 className="fw-bold">Login Success</h1>
      <div>
        <p>
          Redirecting... If not redirected, click <Link href="/">here</Link>
        </p>
      </div>
    </Container>
  )
}

export default LoginSuccess
