import '@fontsource/roboto/300.css';
import { checkLoggedIn } from '../actions/auth'
import { HomePage } from '../components/Home/HomePage'
import { LandingPage } from '../components/Landing/LandingPage'

export default async function App() {
  const isLoggedIn = await checkLoggedIn()
  return isLoggedIn
    ? <HomePage></HomePage>
    : <LandingPage></LandingPage>
}
