import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Button, Container, Grid } from '@mui/material';
import { db } from '../../firebase';
import { useAuth } from '../../components/Context/UserContext';
import { Loading, MovieCard } from '../../components';

export default function Watchlist() {
  const { currentUser } = useAuth();
  const [watchList, setWatchList] = useState(null);
  const getWatchlist = async () => {
    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setWatchList(docSnap.data());
    } else {
      console.log('No doc found!');
    }
  };
  useEffect(() => {
    getWatchlist();
  }, [currentUser]);
  console.log(watchList);

  return (
    <Container>
      <h3>Watch List!</h3>
      {watchList === null ? (
        <Container maxWidth="350" sx={{ ml: 90 }}>
          <Loading />
        </Container>
      ) : (
        <Container sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            {watchList.watchlist.map((movie) => {
              return (
                <Grid item>
                  <MovieCard id={movie.id} image={movie.poster_path} />
                  <Button>Remove</Button>
                  <Button>Watched</Button>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </Container>
  );
}
