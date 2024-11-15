import '@fontsource/roboto/300.css';
import { checkLoggedIn } from '../actions/auth'
import { Home } from './home/page'
import { Landing } from './landing/page'

export default async function App() {
  const isLoggedIn = await checkLoggedIn()
  return isLoggedIn
    ? <Home></Home>
    : <Landing></Landing>
}
