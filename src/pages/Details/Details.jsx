/* eslint-disable no-alert */
import { useParams } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, CardMedia, Typography, Box, Button, Link } from '@mui/material';
import { db } from '../../firebase';
import { Loading } from '../../components';
import { useAuth } from '../../components/Context/UserContext';

export default function Details() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const { currentUser } = useAuth();
  const docRef = doc(db, 'users', currentUser.uid);
  const movieId = id.slice(1);
  console.log(details);

  const onClick = async () => {
    try {
      await updateDoc(docRef, {
        watchlist: arrayUnion(details)
      });
      alert('Added to watchlist!');
    } catch (error) {
      console.log(error);
    }
  };
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
    <Box sx={{ mt: 5.5 }}>
      <Box sx={{ height: '100%', width: '50%', mb: 3 }}>
        <CardMedia
          sx={{ borderRadius: '1%', boxShadow: 12, ml: 12 }}
          component="img"
          image={`https://image.tmdb.org/t/p/w500/${details.backdrop_path}`}
          alt="poster"
        />
      </Box>
      <Container sx={{ display: 'inline-flex', gap: 4, ml: 12 }}>
        <Typography sx={{ color: 'orange' }}>Votes {details.vote_average.toFixed(2)}/10</Typography>
        <Typography sx={{ color: 'white' }}>Year {details.release_date.slice(0, 4)}</Typography>
      </Container>
      <Box sx={{ ml: 15, my: 2 }}>
        <Typography sx={{ fontSize: 24, width: '50%', color: 'white' }}>{details.title}</Typography>
        <Typography sx={{ width: '50%', color: 'white' }}>{details.overview}</Typography>
      </Box>
      <Box sx={{ display: 'inline-flex', ml: 14 }}>
        <Button onClick={onClick}>Add to Watchlist</Button>
        <Button>
          <Link href={`${details.homepage}`} target="_blank" underline="none">
            Movie Website
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
