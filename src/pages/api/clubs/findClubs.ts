import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
import { Club } from '@prisma/client';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Club[] | string>
) {
  if (req.method !== 'GET') {
    return res.status(405).json('Method not allowed');
  }

  const queryValue = req.query?.value
  const value = Array.isArray(queryValue) ? queryValue[0] : queryValue

  const data = await prisma.club.findMany({
    where: {
      name: {
        contains: value
      }
    },
    include: {
      userClubs: true,
      assignments: true
    }
  })
  res.status(200).json(data)
}