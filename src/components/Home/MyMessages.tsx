import { getCurrentUserMessages } from '@/actions/user';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

export async function MyMessages() {
  const messages = await getCurrentUserMessages()
  debugger
  return <Grid container>
    {
      messages.map((message, index) => {
        return <div key={index}>
          <Typography variant='h5'>{message.authorId}</Typography>
          <Typography variant='body1'>{message.content}</Typography>
        </div>
      })
    }
  </Grid>
}
