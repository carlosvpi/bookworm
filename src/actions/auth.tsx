"use server";

import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
// @ts-expect-error: bcrypt doesn't have types, but it is correctly loaded
import bcrypt from 'bcrypt'
import { SignupFormSchema, LoginFormSchema, FormState } from '../lib/definitions'
import { createSession, deleteSession } from '../lib/session'

const prisma = new PrismaClient()

export async function signup(state: FormState, formData: FormData) {

  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.warn(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
 
  // 3. Insert the user into the database or call an Auth Library's API
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })
 
  if (existingUser) {
    return {
      message: 'That user already exists',
    }
  }
 
  const user = await prisma.user.create({
    data: {
      email,
      name: email.split('@')[0],
      password: hashedPassword
    }
  })
  if (!user) {
    return {
      message: 'There was a problem creating your user',
    }
  }

  await createSession(`${user.id}`)

  redirect(`/users/${user.id}`)
}

export async function login(state: FormState, formData: FormData) {

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.warn(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
 
  // 3. Insert the user into the database or call an Auth Library's API
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })
 
  if (existingUser) {
    return {
      message: 'That user already exists',
    }
  }
 
  const user = await prisma.user.create({
    data: {
      email,
      name: email.split('@')[0],
      password: hashedPassword
    }
  })
  if (!user) {
    return {
      message: 'There was a problem creating your user',
    }
  }

  await createSession(`${user.id}`)

  redirect('/profile')
}

export async function logout() {
  deleteSession()
  redirect('/login')
}