import '@fontsource/roboto/300.css';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Image from 'next/image'
import { FeaturedClubs } from '../../components/featuredClubs'

export async function Landing() {
  return <Container maxWidth='md'>
    <Box sx={{ p: 5 }}>
      <Grid container spacing={10} alignItems='center'>
        <Grid size='grow'>
          <h1 style={{ textAlign:'center' }}>Bookworm</h1>
          <p style={{ textAlign:'center' }}>Your book club aggregator!</p>
        </Grid>
        <Grid size='grow'>
          <Image alt='logo' src='/logo-1024.jpg' width='300' height='300'></Image>
        </Grid>
      </Grid>
    </Box>
    <Grid direction='row'>
      <FeaturedClubs></FeaturedClubs>
    </Grid>
  </Container>
}
