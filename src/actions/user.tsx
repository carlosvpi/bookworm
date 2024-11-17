"use server";

import { prisma } from '../lib/db'
import { getCurrentUserId } from './auth';

export async function getUserFriends(id: number) {
  const user = await prisma.user.findFirst({
    where: { id },
    include: {
      friends: true
    }
  })
  return user?.friends ?? []
}

export async function getCurrentUserClubs() {
  const id = await getCurrentUserId()
  const user = await prisma.user.findMany({
    where: { id },
    include: {
      userClubs: {
        include: {
          club: true
        }
      }
    }
  })
  return user[0]?.userClubs ?? [];
}

export async function getCurrentUserMessages() {
  const id = await getCurrentUserId()
  const user = await prisma.user.findMany({
    where: { id },
    include: {
      messages: {
        include: {
          author: true,
          userTarget: true
        },
        where: {
          userTargetId: id
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
  return user[0]?.messages ?? [];
}


export async function getUserToUserMessages(userId: number) {
  const currentUserId = await getCurrentUserId()

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
    include: {
      author: true,
      userTarget: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
  return data;
}
