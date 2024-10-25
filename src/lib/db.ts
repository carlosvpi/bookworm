import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function getUserFriends(userId: number) {
  return await prisma.user.findFirst({
    where: {
      id: +userId
    },
    include: {
      friends: true
    }
  })
}

export async function getUsers() {
  return await prisma.user.findMany()
}
