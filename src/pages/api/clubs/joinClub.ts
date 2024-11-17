import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
import { UserClub } from '@prisma/client';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserClub | string>
) {
  if (req.method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  const { userId, clubId } = req.body;

  const data = await prisma.userClub.create({
    data: {
      userRole: 'Member',
      userId,
      clubId
    }
  })
  res.status(200).json(data)
}