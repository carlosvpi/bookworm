import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
import { User } from '@prisma/client';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | string>
) {
  if (req.method !== 'GET') {
    return res.status(405).json('Method not allowed');
  }

  const queryValue = req.query?.userId
  const userId = +(Array.isArray(queryValue) ? queryValue[0] : queryValue ?? '')

  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      friends: {
        include: {
          friends: true
        }
      }
    }
  })
  res.status(200).json(data?.friends ?? [])
}