import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import App from './App';
import { Login, Register, Dashboard, Search, Series, Movies, Watchlist, Details } from './pages';
import './index.css';
import { Navbar, Footer } from './components';
import { UserProvider } from './components/Context/UserContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/watchlist',
        element: <Watchlist />
      },
      {
        path: '/series',
        element: <Series />
      },
      {
        path: '/movies',
        element: <Movies />
      },
      {
        path: '/:id',
        element: <Details />
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
  // </React.StrictMode>
);

function NavbarWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
