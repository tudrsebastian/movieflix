import { Carousel } from '@trendyol-js/react-carousel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { MovieCard } from '../Card';
import { apis } from '../data/data';
import { Loading } from '../Loading';

export default function LatestTV() {
  const series = useFetch(apis.latestSeries);
  const [display, setDisplay] = useState(7.5);
  const [margins, setMargins] = useState(20);
  useEffect(() => {
    if (window.innerWidth <= 720) {
      setDisplay(3);
      setMargins(8);
    } else if (window.innerWidth <= 1281) {
      setDisplay(4.5);
      setMargins(18);
    }
  }, []);

  if (!series) return <Loading />;
  return (
    <Carousel
      leftArrow={<ArrowCircleLeftIcon sx={{ color: 'white', my: margins }} />}
      rightArrow={<ArrowCircleRightIcon sx={{ color: 'white', my: margins }} />}
      show={display}
      swiping="true "
      responsive="true"
      infinite="true">
      {series.map((serie) => (
        <MovieCard id={serie.id} image={serie.poster_path} />
      ))}
    </Carousel>
  );
}
