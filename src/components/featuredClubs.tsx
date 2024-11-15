import Grid from '@mui/material/Grid2'
import { ClubCard } from './clubCard'
import { getFeaturedClubs } from '../actions/club'

export async function FeaturedClubs () {
  const clubs = await getFeaturedClubs()
  console.log(clubs[0].assignments)
  return <Grid direction='column' height='400'>
    {
      clubs.map(club => <ClubCard key={club.id} {...club} />)
    }
  </Grid>
}
