/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Grid } from '@mui/material';
import { Carousel } from '@trendyol-js/react-carousel';
import { useState, useEffect } from 'react';
import { Loading } from '../Loading';
import MovieCard from '../Card/Card';
import useFetch from '../hooks/useFetch';
import { apis } from '../data/data';

export default function Hero() {
  const data = useFetch(apis.upcomingMovies);
  const [display, setDisplay] = useState(7.5);
  const [margins, setMargins] = useState(20);
  useEffect(() => {
    if (window.innerWidth <= 720) {
      setDisplay(3);
      setMargins(8);
    } else if (window.innerWidth <= 1281) {
      setDisplay(4.5);
      setMargins(20);
    }
  }, []);
  if (!data) return <Loading />;
  return (
    <Carousel
      leftArrow={<ArrowCircleLeftIcon sx={{ color: 'white', my: margins }} />}
      rightArrow={<ArrowCircleRightIcon sx={{ color: 'white', my: margins }} />}
      show={display}
      swiping="true"
      swipeOn={2}
      responsive="true"
      infinite="true">
      {data.map((movie) => (
        <Grid container spacing={2}>
          <MovieCard id={movie.id} image={movie.poster_path} />
        </Grid>
      ))}
    </Carousel>
  );
}
