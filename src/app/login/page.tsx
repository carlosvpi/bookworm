"use client"

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { login } from '../../actions/auth'

export default function Login() {
  const [loginState, loginAction] = useActionState(login, undefined)

  return <>
    <form action={loginAction} className='p-4 rounded shadow-md my-20 container max-w-md mx-auto' style={{ backgroundColor: 'rgb(242,235,217)' }}>
      <div className='flex justify-between items-center'>
        <label htmlFor="email">Email</label>
        <input className='rounded p-2 w-72 border border-solid border-black hover:border-white' id="email" name="email" type="email" placeholder="Email" />
      </div>
      {loginState?.errors?.email && <p>{loginState.errors.email}</p>}
      <div className='my-4 flex justify-between items-center'>
        <label htmlFor="password">Password</label>
        <input className='rounded p-2 w-72 border border-solid border-black hover:border-white' id="password" name="password" type="password" />
      </div>
      {loginState?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {loginState.errors.password.map((error) => (
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
    <button className='w-full mx-1 bg-white/25 hover:bg-white/75 p-2 rounded shadow-md' disabled={pending} type="submit">
      Log in
    </button>
  )
}