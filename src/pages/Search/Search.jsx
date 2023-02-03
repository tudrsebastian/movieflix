import { Container, TextField, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MovieCard } from '../../components';

export default function Search() {
  const [query, setQuery] = useState('Avatar');
  const [list, setList] = useState([]);
  console.log(list);
  console.log(query);
  useEffect(() => {
    const searchResult = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&page=1&include_adult=false&query=${query}`
        );
        setList(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    searchResult();
  }, [query]);
  return (
    <Container maxWidth="sm">
      <TextField
        id="outlined-basic"
        label="Search"
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        sx={{ my: 5 }}
      />
      {list.length === 0 ? (
        <div>
          <p>Find your favorite movies and TV shows</p>
        </div>
      ) : (
        <Grid container spacing={2}>
          {list.map((item) => {
            return (
              <Grid item xs={4}>
                <MovieCard id={item.id} image={item.poster_path} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}
