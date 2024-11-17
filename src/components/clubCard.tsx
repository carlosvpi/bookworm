import { Club } from '@prisma/client';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';

export function ClubCard ({ id, createdAt, name, description }: Club) {
  return <Box sx={{ maxWidth: 275 }}>
    <Card variant='outlined'>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {`${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getUTCFullYear()}`}
        </Typography>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2'>
          {description || 'No description provided'}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/clubs/${id}`}>Peep</Link>
      </CardActions>
    </Card>
  </Box>
}