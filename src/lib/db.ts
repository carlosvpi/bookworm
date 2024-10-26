import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function getUser(userId: number): Promise<User | null> {
  const dbUser = await prisma.user.findFirst({
    where: {
      id: +userId
    },
    include: {
      friends: true,
      userClubs: {
        include: {
          club: true
        }
      }
    }
  })
  if (!dbUser) return null

  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    friends: dbUser.friends.map(({ id, name }) => ({ id: id, name })),
    clubs: {
      creator: dbUser.userClubs.filter(({ usserRole }) => usserRole === 'Creator').map(({ club }) => club),
      admin: dbUser.userClubs.filter(({ usserRole }) => usserRole === 'Admin').map(({ club }) => club),
      member: dbUser.userClubs.filter(({ usserRole }) => usserRole === 'Member').map(({ club }) => club)
    }
  }
}

export type User = {
  id: number
  name: string
  email: string
  friends: {id: number, name: string}[]
  clubs: {
    creator: Club[]
    admin: Club[]
    member: Club[]
  }
}

export type Club = {id: number, name: string}

export async function getUsers() {
  return await prisma.user.findMany()
}
