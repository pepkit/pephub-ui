// gets info for the currently logged in user
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { SessionWithAccessToken } from '../auth/[...nextauth]'

// returns the user's name, username, and avatar
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get account from next-auth
  const session: SessionWithAccessToken | null = await getSession({ req })

  // const octokit = new Octokit({
  //   auth: token,
  // })
  // const { data } = await octokit.request('GET /user')
  // fetch github apoi with htoken as a header
  if (session) {
    const data = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    }).then((res) => res.json())
    res.status(200).json(data)
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
