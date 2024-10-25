import Image from 'next/image'
import { logout, gotoSignup, gotoLogin } from '../actions/auth'
import { Button } from './button'

export function Header({ userName }: { userName: string | null }) {
  return <section className='flex justify-between items-center shadow-md pr-4' style={{ backgroundColor: 'rgb(242,235,217)' }}>
    <section className='flex justify-start items-center'>
      <Image alt='logo' src='/logo.jpg' width='100' height='100'></Image>
      <span>A</span>
      <span>B</span>
    </section>
    <section className='flex justify-end'>
      {
        userName ?
          <div className='flex items-center'>
            <Button>{userName}</Button>
            <Button onClick={logout}>Log out</Button>
          </div>
          : <div className='flex items-center'>
            <Button onClick={gotoSignup}>Sign up</Button>
            <Button onClick={gotoLogin}>Log in</Button>
          </div>
      }
    </section>
  </section>
}
