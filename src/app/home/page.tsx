import '@fontsource/roboto/300.css';
import Box from '@mui/material/Box'
import { getCurrentUserName } from '../../actions/auth'

export async function Home() {
  const userName = getCurrentUserName()
  return <Box sx={{ p: '10' }}>
    <p>Hello, {userName}</p>
  </Box>
}
