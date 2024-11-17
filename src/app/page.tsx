import '@fontsource/roboto/300.css';
import { checkLoggedIn } from '../actions/auth'
import { HomePage } from '../components/home/page'
import { LandingPage } from '../components/landing/page'

export default async function App() {
  const isLoggedIn = await checkLoggedIn()
  return isLoggedIn
    ? <HomePage></HomePage>
    : <LandingPage></LandingPage>
}
