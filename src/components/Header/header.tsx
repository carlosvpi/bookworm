import Image from 'next/image'
import Link from 'next/link'
import { checkLoggedIn } from '../../actions/auth'
import { LogInHeader } from './logInHeader';
import { LogOutHeader } from './logOutHeader';

export async function Header() {
  const isLoggedIn = await checkLoggedIn()

  return <section className='flex justify-between items-center shadow-md pr-4' style={{ backgroundColor: 'rgb(242,235,217)' }}>
    <section className='flex justify-start items-center'>
      <Link href='/'><Image alt='logo' src='/logo-256.jpg' width='100' height='100'></Image></Link>
      <span>A</span>
      <span>B</span>
    </section>
    <section className='flex justify-end'>
      {
        isLoggedIn ? <LogInHeader></LogInHeader> : <LogOutHeader></LogOutHeader>
      }
    </section>
  </section>
}
