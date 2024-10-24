"use server"
 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react';
import { decrypt } from './session'
 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId }
})