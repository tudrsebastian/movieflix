import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, CardMedia, Typography, Box, Button, Link, CssBaseline } from '@mui/material';
import { Loading } from '../../components';

export default function Details() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const movieId = id.slice(1);
  console.log(details);
  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(`
            https://api.themoviedb.org/3/movie/${movieId}?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`);
        setDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [id]);
  if (details === null) return <Loading />;
  return (
    <Box>
      <Container sx={{ display: 'inline-flex', gap: 4 }}>
        <Typography sx={{ color: 'orange' }}>Votes {details.vote_average.toFixed(2)}/10</Typography>
        <Typography sx={{ color: 'white' }}>Year {details.release_date.slice(0, 4)}</Typography>
      </Container>
      <Box sx={{ height: '100%', width: '50%', mb: 3 }}>
        <CardMedia
          sx={{ border: 1, borderRadius: '1%' }}
          component="img"
          image={`https://image.tmdb.org/t/p/w500/${details.backdrop_path}`}
          alt="poster"
        />
      </Box>
      <Typography sx={{ fontSize: 24, width: '50%', color: 'white' }}>{details.title} </Typography>
      <Typography sx={{ width: '50%', color: 'white' }}>{details.overview}</Typography>

      <CssBaseline />
      <Box sx={{ display: 'inline-flex', mt: 4, mb: 5 }}>
        <Button>Add to Watchlist</Button>
        <Button>
          <Link href={`${details.homepage}`} target="_blank" underline="none">
            Movie Website
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
