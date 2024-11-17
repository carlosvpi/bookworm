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

  const { authorId, content, userTargetId } = req.body;

  await prisma.message.create({
    data: {
      authorId,
      content,
      type: 'DirectMessage',
      userTargetId
    }
  })
  res.status(200).json({ message: `Message (${content.length} characters) sent from ${authorId} to ${userTargetId}` })
}