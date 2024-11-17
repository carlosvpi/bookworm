import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
import { Message } from '@prisma/client';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message[] | string>
) {
  if (req.method !== 'GET') {
    return res.status(405).json('Method not allowed');
  }

  const userId = +(req.query?.userId as string)
  const currentUserId = +(req.query?.currentUserId as string)

  const data = await prisma.message.findMany({
    where: {
      OR: [
        {
          authorId: userId,
          userTargetId: currentUserId,
        },
        {
          authorId: currentUserId,
          userTargetId: userId,
        }
      ]
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
  res.status(200).json(data)
}