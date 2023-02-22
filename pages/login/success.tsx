import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const LoginSuccess: NextPage = () => {
  const router = useRouter()
  const [, setPEPhubJWT] = useLocalStorage('pephub_jwt', null)
  const { token } = router.query

  useEffect(() => {
    if (token && setPEPhubJWT !== undefined) {
      // set token in local storage
      setPEPhubJWT(token)
      // redirect to home page
      router.push('/')
    }
  }, [token, setPEPhubJWT, router])

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
