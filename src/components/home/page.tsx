import '@fontsource/roboto/300.css';
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { getCurrentUserId } from '../../actions/auth'
import { FindUser } from '../findUser'
import { Typography } from '@mui/material';

function BookClubs ({ currentUserId }: {currentUserId:number}) {
  return <p>Book clubs for user with id = {currentUserId}</p>
}

export async function HomePage() {
  const id = await getCurrentUserId()
  return <Grid container>
    <Grid maxWidth={300}>
      <Paper elevation={3}>
        <Typography variant='h5'>Friends</Typography>
        <FindUser currentUserId={id} ></FindUser>
      </Paper>
    </Grid>
    <Grid>
      <BookClubs currentUserId={id} ></BookClubs>
    </Grid>
  </Grid>
}
