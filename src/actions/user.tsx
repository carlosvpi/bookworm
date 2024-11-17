"use server";

import { prisma } from '../lib/db'

export async function getUserFriends(id: number) {
  const user = await prisma.user.findFirst({
    where: { id },
    include: {
      friends: true
    }
  })
  return user?.friends ?? []
}
