import { getCurrentUserClubs } from '@/actions/user';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

function compareRole(a: string, b: string) {
  if (a === 'Creator') return -1
  if (b === 'Creator') return 1
  if (a === 'Admin') return -1
  if (b === 'Admin') return 1
  return 1
}

export async function MyClubs() {
  const userClubs = await getCurrentUserClubs()
  const userClubsToShow = userClubs.toSorted((uClubA, uClubB) => compareRole(uClubA.userRole, uClubB.userRole))
  return <Grid container>
    {
      userClubsToShow.map((userClub, index) => {
        return <Box key={index} p={2} sx={{ minWidth: 275 }}>
          <Card variant="outlined" sx={{ minHeight: 185 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {userClub.userRole}
              </Typography>
              <Typography variant="h5" component="div">
                <Link href={`/clubs/${userClub.clubId}`}>{userClub.club.name}</Link>
              </Typography>
              <Typography variant="body2">
                {userClub.club.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      })
    }
  </Grid>
}
