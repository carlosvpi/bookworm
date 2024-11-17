import Grid from '@mui/material/Grid2'
import { ClubCard } from './clubCard'
import { getFeaturedClubs } from '../actions/club'

export async function FeaturedClubs () {
  const clubs = await getFeaturedClubs()
  return <Grid container spacing={4} direction='column' maxHeight={400}>
    {
      clubs.map(club => <Grid key={club.id}><ClubCard {...club} /></Grid>)
    }
  </Grid>
}
