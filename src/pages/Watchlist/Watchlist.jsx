import { useEffect, useState } from 'react';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { useAuth } from '../../components/Context/UserContext';
import { Loading, MovieCard } from '../../components';

export default function Watchlist() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
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
    if (currentUser === null) {
      navigate('/login');
    }
  }, [currentUser]);
  const onClick = async (id) => {
    const docRef = doc(db, 'users', currentUser.uid);
    await updateDoc(docRef, {
      watchlist: arrayRemove(id)
    });
    console.log('Clicked!', id);
  };
  return (
    <Container>
      <Typography color="white" sx={{ fontSize: 35, textAlign: 'center', my: 17.5 }}>
        {' '}
        Welcome to your Watchlist!
      </Typography>
      {watchList !== null && watchList.watchlist.length === 0 ? (
        <Grid container spacing={2} sx={{ my: 30 }}>
          <Grid item xs={12}>
            <Typography color="white" sx={{ fontSize: 25 }}>
              No movies added Yet!
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="white" sx={{ fontSize: 25 }}>
              When you will add movies to watchlist they will appear here!
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Container>
          {watchList === null ? (
            <Container maxWidth="350" sx={{ ml: 90 }}>
              <Loading />
            </Container>
          ) : (
            <Container sx={{ my: 5 }}>
              <Grid container spacing={2}>
                {watchList.watchlist.map((movie) => {
                  return (
                    <Grid item>
                      <MovieCard id={movie.id} image={movie.poster_path} />
                      <Button onClick={() => onClick(movie.id)}>Remove</Button>
                      <Typography color="red">Not functional yet!</Typography>
                      <Button>Watched</Button>
                      <Typography color="red">Not functional yet!</Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          )}
        </Container>
      )}
    </Container>
  );
}
