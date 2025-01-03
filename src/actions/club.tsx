"use server";

import { redirect } from 'next/navigation'
import { CreateClubFormSchema } from '../lib/definitions'
import { prisma } from '../lib/db'
import { readSession } from '../lib/session'

export async function gotoNewClub() {
  redirect('/clubs/new')
}

export async function gotoClub(id: number) {
  redirect(`/clubs/${id}`)
}

export async function getFeaturedClubs() {
  return await prisma.club.findMany({
    take: 10,
    include: {
      userClubs: true,
      assignments: {
        include: {
          book: true
        }
      }
    },
    orderBy: {
      userClubs: {
        _count: 'asc'
      }
    }
  })
}

export async function createClub(state: any, formData: FormData) {
  const validatedFields = CreateClubFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.warn(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const id = +(await readSession() ?? 0)
  const { name, description } = validatedFields.data

  if (!id) return null
  const club = await prisma.club.create({
    data: {
      name,
      description,
      board: {
        create: {
          type: 'ClubBoard'
        }
      }
    }
  })
  if (!club) {
    return {
      message: 'There was a problem creating your club',
    }
  }

  const userClub = await prisma.userClub.create({
    data: {
      userRole: 'Creator',
      clubId: club.id,
      userId: id
    }
  })
  if (!userClub) {
    return {
      message: 'There was a problem creating your userClub',
    }
  }

  redirect(`/clubs/${club.id}`)
}

