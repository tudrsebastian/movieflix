/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function MovieCard({ image, id }) {
  const [width, setWidth] = useState(540);
  const [cardHeight, setCardHeight] = useState(320);

  useEffect(() => {
    if (window.innerWidth <= 720) {
      setWidth(340);
      setCardHeight(160);
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1280) {
      setCardHeight(300);
      setWidth(220);
    } else if (window.innerWidth <= 620) {
      setCardHeight(300);
      setWidth(25);
    }
  }, []);
  return (
    <Card
      key={id}
      sx={{
        maxWidth: width,
        my: 2,
        transition: 'transform 0.15s ease-in-out',
        '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' }
      }}>
      <CardMedia
        component="img"
        sx={{ objectFit: 'full', height: cardHeight, px: 1, background: '#2E3B55' }}
        image={`https://image.tmdb.org/t/p/w500/${image}`}
        alt="movie"
      />
    </Card>
  );
}
