"use server";

import { redirect } from 'next/navigation'
import { CreateClubFormSchema } from '../lib/definitions'
import { prisma } from '../lib/db'

export async function gotoNewClub() {
  redirect('/clubs/new')
}

export async function createClub(state: any, formData: FormData) {
  const validatedFields = CreateClubFormSchema.safeParse({
    name: formData.get('name')
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.warn(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  console.log('creating')
}

