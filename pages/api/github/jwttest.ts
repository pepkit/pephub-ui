import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionInfo = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  //   const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET || '')
  //   console.log(payload)
  if (sessionInfo) {
    // sign token using simpler algorithm + encryption
    const sessionInfoResigned = jwt.sign(
      sessionInfo,
      process.env.NEXTAUTH_SECRET || '',
      {
        algorithm: 'HS256',
      }
    )
    fetch(`http://localhost:8000/api/v1/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionInfoResigned}`,
      },
    })
    res.status(200).json({ sessionInfoResigned })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
