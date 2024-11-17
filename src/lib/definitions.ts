import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
  repeatPassword: z.string()
}).refine(data => data.password === data.repeatPassword, {
  message: 'Password missmatch',
  path: ['repeatPassword']
})
 
export type SignupFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
        repeatPassword?: string[]
      }
      message?: string
    }
  | undefined

export type SessionPayload = {
  id: string
  expiresAt: Date
}

export const CreateClubFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Be at least 4 characters long' })
    .trim(),
  description: z
    .string()
    .min(4, { message: 'Be at least 4 characters long' })
    .trim()
})

export type CreateClubFormState =
  | {
      errors?: {
        name?: string[]
      }
      message?: string
    }
  | undefined
