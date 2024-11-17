import '@fontsource/roboto/300.css';
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography';
import { getCurrentUserId } from '../../actions/auth'
import { FindUser } from './FindUser'
import { HomeTabs } from './HomeTabs'

export async function HomePage() {
  const id = await getCurrentUserId()
  return <Grid container>
    <Grid sx={{ width: 275 }}>
      <Typography variant='h5'>Friends</Typography>
      <FindUser currentUserId={id} ></FindUser>
    </Grid>
    <Grid sx={{ flex: 1 }}>
      <HomeTabs></HomeTabs>
    </Grid>
  </Grid>
}
