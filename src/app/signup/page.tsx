"use client"

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { signup } from '../../actions/auth'
import { Button } from '../../components/button'

export default function Signup() {
  const [signupState, signupAction] = useActionState(signup, undefined)

  return <>
    <form action={signupAction} className='p-4 rounded shadow-md my-20 container max-w-md mx-auto' style={{ backgroundColor: 'rgb(242,235,217)' }}>
      <div className='flex justify-between items-center'>
        <label htmlFor="email">Email</label>
        <input className='rounded p-2 w-72 border border-solid border-black hover:border-white' id="email" name="email" type="email" placeholder="Email" />
      </div>
      {signupState?.errors?.email && <p>{signupState.errors.email}</p>}
      <div className='my-4 flex justify-between items-center'>
        <label htmlFor="password">Password</label>
        <input className='rounded p-2 w-72 border border-solid border-black hover:border-white' id="password" name="password" type="password" />
      </div>
      {signupState?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {signupState.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className='my-4 flex justify-between'>
        <label htmlFor="repeatPassword">Password again</label>
        <input className='rounded p-2 w-72 border border-solid border-black hover:border-white' id="repeatPassword" name="repeatPassword" type="password" />
      </div>
      {signupState?.errors?.repeatPassword && (
        <div>
          <ul>
            {signupState.errors.repeatPassword.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton />
    </form>
  </>
}

function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <Button type="submit" tw='w-full' disabled={pending}>Sign up</Button>
  )
}