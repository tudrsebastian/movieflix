import { Carousel } from '@trendyol-js/react-carousel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { MovieCard } from '../Card';
import { apis } from '../data/data';
import { Loading } from '../Loading';

export default function Popular() {
  const movies = useFetch(apis.topMovies);
  const [display, setDisplay] = useState(7.5);
  const [margins, setMargins] = useState(20);
  useEffect(() => {
    if (window.innerWidth <= 720) {
      setDisplay(2.5);
      setMargins(8);
    } else if (window.innerWidth <= 1281) {
      setDisplay(3.5);
      setMargins(18);
    }
  }, []);
  if (!movies) return <Loading />;
  return (
    <Carousel
      leftArrow={<ChevronLeftIcon sx={{ color: 'white', my: margins }} />}
      rightArrow={<ChevronRightIcon sx={{ color: 'white', my: margins }} />}
      show={display}
      swiping="true "
      responsive="true"
      infinite="true">
      {movies.map((movie) => (
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <MovieCard id={movie.id} image={movie.poster_path} />
          </Grid>
        </Grid>
      ))}
    </Carousel>
  );
}
