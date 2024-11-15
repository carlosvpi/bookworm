import { gotoSignup, gotoLogin } from '../actions/auth'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

export function LogOutHeader() {
  return <Grid container spacing={1}>
    <Button variant='contained' onClick={gotoSignup}>Sign up</Button>
    <Button variant='contained' onClick={gotoLogin}>Log in</Button>
  </Grid>
}
