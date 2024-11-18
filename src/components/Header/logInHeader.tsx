import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { logout, gotoCurrentUser } from '../../actions/auth'
import { getCurrentUserName } from '../../actions/auth'

export function LogInHeader() {
  const userName = getCurrentUserName()
  return <Grid container spacing={1}>
    <Button variant='contained' onClick={gotoCurrentUser}>{userName}</Button>
    <Button variant='contained' onClick={logout}>Log out</Button>
  </Grid>
}
