import '@fontsource/roboto/300.css';
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { User } from '@prisma/client';
import { UserToUserMessages } from './UserToUserMessages';

function UserProfile({ currentUserId }: { currentUserId: number }){
  return <>
    <p>{currentUserId}</p>
  </>
}

export async function UserPage({
  currentUserId,
  user
}: {
  currentUserId: number,
  user: User
}) {
  return <Grid container direction='column'>
    {
      user.id === currentUserId && <>
        <Grid>
          <UserProfile currentUserId={currentUserId}></UserProfile>
        </Grid>
        <Divider orientation='horizontal' variant='middle' flexItem />
      </>
    }
    <Grid sx={{ flex: 1 }}>
      <UserToUserMessages currentUserId={currentUserId} user={user}></UserToUserMessages>
    </Grid>
  </Grid>
}
