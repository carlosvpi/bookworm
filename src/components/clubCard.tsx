import { Club } from '@prisma/client';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function ClubCard ({createdAt, name}: Club) {
  return <Box sx={{ maxWidth: 275 }}>
    <Card variant='outlined'>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {`${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getUTCFullYear()}`}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2">
          Description
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Peep</Button>
      </CardActions>
    </Card>
  </Box>
}