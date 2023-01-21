import './App.css';
import { useAuth } from './components/Context/UserContext';

function App() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
