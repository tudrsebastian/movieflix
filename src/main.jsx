import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Navbar } from './components';
import { UserProvider } from './components/Context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <UserProvider>
    <Navbar />
    <App />
  </UserProvider>
  // </React.StrictMode>
);
