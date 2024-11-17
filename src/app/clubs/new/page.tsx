"use client"

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { createClub } from '../../../actions/club'
import { Button } from '../../../components/button'

export default function NewClub() {
  const [createClubState, createClubAction] = useActionState(createClub, undefined)

  return <>
    <form action={createClubAction} className='p-4 rounded shadow-md my-20 container max-w-md mx-auto' style={{ backgroundColor: 'rgb(242,235,217)' }}>
      <div className='flex justify-between items-center'>
        <label htmlFor="name">Name</label>
        <input className='rounded p-2 w-72 border border-solid border-black hover:border-white' id="name" name="name" type="text" placeholder="Club name" />
      </div>
      {createClubState?.errors?.name && <p>{createClubState.errors.name}</p>}
      <div className='flex justify-between items-center'>
        <label htmlFor="description">Description</label>
        <input className='rounded p-2 w-72 border border-solid border-black hover:border-white' id="description" name="description" type="text" placeholder="Club description" />
      </div>
      {createClubState?.errors?.name && <p>{createClubState.errors.name}</p>}
      <SubmitButton />
    </form>
  </>
}

function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <Button type="submit" tw='w-full mt-4' disabled={pending}>Create</Button>
  )
}