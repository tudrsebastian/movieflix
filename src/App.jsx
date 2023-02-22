import './App.css';
import { Container, Typography } from '@mui/material';
import { useAuth } from './components/Context/UserContext';
import { Hero, Latest, LatestTV, Popular, PopularTV, Toprated, TopratedTV } from './components';

function App() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Container maxWidth="350" className="App" sx={{ mt: 4 }}>
      <Hero />
      <Typography variant="h5" color="white" sx={{ ml: 5 }}>
        Latest
      </Typography>
      <Latest />
      <Typography color="white" variant="h5" sx={{ ml: 5 }}>
        Top rated
      </Typography>
      <Toprated />
      <Typography variant="h5" color="white" sx={{ ml: 5 }}>
        Trending
      </Typography>
      <Popular />
      <Typography variant="h5" color="white" sx={{ ml: 5 }}>
        Latest TV shows
      </Typography>
      <LatestTV />
      <Typography variant="h5" color="white" sx={{ ml: 5 }}>
        Top rated TV shows
      </Typography>
      <TopratedTV />
      <Typography variant="h5" color="white" sx={{ ml: 5 }}>
        Popular TV shows
      </Typography>
      <PopularTV />
    </Container>
  );
}

export default App;
