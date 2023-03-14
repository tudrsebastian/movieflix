/* eslint-disable no-alert */
import { useParams } from 'react-router-dom';
import { Carousel } from '@trendyol-js/react-carousel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, CardMedia, Typography, Box, Button, Link, Grid } from '@mui/material';
import { MovieCard } from '../../components/Card';
import { db } from '../../firebase';
import { Loading } from '../../components';
import { useAuth } from '../../components/Context/UserContext';

export default function Details() {
  const [details, setDetails] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [display, setDisplay] = useState(7.5);
  const [margins, setMargins] = useState(20);
  const { id } = useParams();
  const { currentUser } = useAuth();
  console.log(similar);
  const movieId = id.slice(1);
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
  const getSimilar = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1#`
      );
      console.log(res);
      setSimilar(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const onClick = async () => {
    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, {
        watchlist: arrayUnion(details)
      });
      alert('Added to watchlist!');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetails();
    getSimilar();
  }, [id]);
  useEffect(() => {
    if (window.innerWidth <= 720) {
      setDisplay(2.5);
      setMargins(8);
    } else if (window.innerWidth <= 1281) {
      setDisplay(3.5);
      setMargins(18);
    }
  }, []);
  if (details === null) return <Loading />;
  return (
    <Box sx={{ mt: 5.5 }}>
      <Box sx={{ height: '100%', width: '60%', mb: 3 }}>
        <CardMedia
          sx={{ borderRadius: '1%', boxShadow: 12, ml: 4 }}
          component="img"
          image={`https://image.tmdb.org/t/p/w500/${details.backdrop_path}`}
          alt="poster"
        />
      </Box>
      <Container sx={{ display: 'flex', gap: 4 }}>
        <Typography sx={{ color: 'orange' }}>Votes {details.vote_average.toFixed(2)}/10</Typography>
        <Typography sx={{ color: 'white' }}>Year {details.release_date.slice(0, 4)}</Typography>
      </Container>
      <Box sx={{ ml: 7, my: 2 }}>
        <Typography sx={{ fontSize: 24, color: 'white' }}>{details.title}</Typography>
        <Typography sx={{ color: 'white' }}>{details.overview}</Typography>
      </Box>
      <Box sx={{ display: 'inline-flex', ml: 7, mb: 7 }}>
        <Button onClick={onClick}>Add to Watchlist</Button>
        <Button>
          <Link href={`${details.homepage}`} target="_blank" underline="none">
            Movie Website
          </Link>
        </Button>
      </Box>
      <Typography sx={{ marginLeft: 8, fontSize: 24, color: 'white' }}>Similar Movies</Typography>
      {similar === null ? (
        <Loading />
      ) : (
        <Carousel
          leftArrow={<ChevronLeftIcon sx={{ color: 'white', my: margins }} />}
          rightArrow={<ChevronRightIcon sx={{ color: 'white', my: margins }} />}
          show={display}
          swiping="true "
          responsive="true"
          infinite="true">
          {similar.map((movie) => (
            <Grid container spacing={2} sx={{ mb: 14 }}>
              <Grid item xs={11}>
                <MovieCard id={movie.id} image={movie.poster_path} />
              </Grid>
            </Grid>
          ))}
        </Carousel>
      )}
    </Box>
  );
}
