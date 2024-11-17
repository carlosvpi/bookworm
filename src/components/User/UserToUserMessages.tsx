import '@fontsource/roboto/300.css';
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { User } from '@prisma/client';
import { getUserToUserMessages } from '@/actions/user';
import { UserToUserMessageInput } from './UserToUserMessageInput';

export async function UserToUserMessages({
  currentUserId,
  user
}: {
  currentUserId: number,
  user: User
}) {
  const messages = await getUserToUserMessages(user.id)
  return <Grid container direction='column'>
    {
      messages.map(message => {
        return <div key={message.id}>
          <Typography variant='body2'>
            {message.author.name}
          </Typography>
          <Typography variant='body1'>
            {message.content}
          </Typography>
          <Divider></Divider>
        </div>
      })
    }
    <UserToUserMessageInput
      currentUserId={currentUserId}
      user={user}
    ></UserToUserMessageInput>
  </Grid>
}
