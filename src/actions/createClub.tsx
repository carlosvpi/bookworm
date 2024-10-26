"use server";

import { redirect } from 'next/navigation'
import { prisma } from '../lib/db'

export async function gotoNewClub() {
  redirect('/clubs/new')
}

export async function createClub() {
  
}
