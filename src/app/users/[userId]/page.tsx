import { checkLoggedIn, getCurrentUserId } from '@/actions/auth';
import { getUser } from '../../../lib/db'
import '@fontsource/roboto/300.css';
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { UserToUserMessages } from '../../../components/User/UserToUserMessages';
import { User } from '@prisma/client';

function UserProfile({ name }: { name: string }){
  return <>
    <p>{name}</p>
  </>
}

export default async function UserPage({ params }: { params: { userId: string} }) {
  const isLoggedIn = await checkLoggedIn()
  if (!isLoggedIn) return <p>You should not be here</p>

  const currentUserId = await getCurrentUserId()
  const { userId } = await params;
  const user = await getUser(+userId)

  if (!user) return <p>You should not be here</p>

  return <Grid container direction='column'>
    {
      user.id === currentUserId && <>
        <Grid>
          <UserProfile name={user.name}></UserProfile>
        </Grid>
        <Divider orientation='horizontal' variant='middle' flexItem />
      </>
    }
    <Grid sx={{ flex: 1 }}>
      <UserToUserMessages currentUserId={currentUserId} user={user}></UserToUserMessages>
    </Grid>
  </Grid>
}
