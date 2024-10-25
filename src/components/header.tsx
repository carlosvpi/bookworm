import Image from 'next/image'
import { logout, gotoSignup, gotoLogin } from '../actions/auth'

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
            <button className='mx-1 bg-white/25 hover:bg-white/75 p-2 rounded shadow-md'>
              <span>{userName}</span>
            </button>
            <button className='mx-1 bg-white/25 hover:bg-white/75 p-2 rounded shadow-md' onClick={ logout }>
              <span>Log out</span>
            </button>
          </div>
          : <div className='flex items-center'>
            <button className='mx-1 bg-white/25 hover:bg-white/75 p-2 rounded shadow-md' onClick={ gotoSignup }>
              <span>Sign up</span>
            </button>
            <button className='mx-1 bg-white/25 hover:bg-white/75 p-2 rounded shadow-md' onClick={ gotoLogin }>
              <span>Log in</span>
            </button>
          </div>
      }
    </section>
  </section>
}
