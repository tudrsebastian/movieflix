import './App.css';
import { useAuth } from './components/Context/UserContext';
import { Hero, Latest, LatestTV, Popular, PopularTV, Toprated, TopratedTV } from './components';

function App() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div className="App">
      <Hero />
      <h3>Latest</h3>
      <Latest />
      <h3>Top rated</h3>
      <Toprated />
      <h3>Trending</h3>
      <Popular />
      <h3>Latest TV shows</h3>
      <LatestTV />
      <h3>Top rated TV shows</h3>
      <TopratedTV />
      <h3>Popular TV shows</h3>
      <PopularTV />
    </div>
  );
}

export default App;
