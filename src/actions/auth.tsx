"use server";

import { redirect } from 'next/navigation'
import { prisma } from '../lib/db'
// @ts-expect-error: bcrypt doesn't have types, but it is correctly loaded
import bcrypt from 'bcrypt'
import { SignupFormSchema, SignupFormState, LoginFormSchema, LoginFormState } from '../lib/definitions'
import { createSession, deleteSession, readSession } from '../lib/session'

export async function signup(state: SignupFormState, formData: FormData) {

  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword')
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

export async function login(state: LoginFormState, formData: FormData) {
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
 
  // 3. Find the user in the database or call an Auth Library's API
  const user = await prisma.user.findUnique({
    where: { email }
  })
 
  if (!user) {
    return {
      message: 'User not found',
    }
  }

  if (!bcrypt.compare(user.password, password)) {
    return {
      message: 'Wrong password!'
    }
  }

  await createSession(`${user.id}`)

  redirect(`/users/${user.id}`)
}

export async function logout() {
  deleteSession()
  console.log('logout')
  redirect('/login')
}

export async function getCurrentUserName() {
  const id = +(await readSession() ?? 0)

  if (!id) return null
  console.log('getting user name, ', id)

  const user = await prisma.user.findUnique({
    where: { id }
  })
  return user?.name ?? null
}

export async function gotoSignup() {
  redirect('/signup')
}

export async function gotoLogin() {
  redirect('/login')
}