import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, friendId } = req.body;

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      friends: {
        disconnect: { id: friendId }
      },
      friendOf: {
        disconnect: { id: friendId }
      }
    }
  })
  res.status(200).json({ message: `Unfriended ${userId} with ${friendId}` })
}