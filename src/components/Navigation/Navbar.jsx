import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Button, Icon, Link } from '@mui/material';
import Menu from '@mui/material/Menu';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
// eslint-disable-next-line import/no-extraneous-dependencies
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useAuth } from '../Context/UserContext';

const routes = [
  {
    id: 'hb32142b213',
    icon: <HomeIcon />,
    name: 'Home',
    link: '/'
  },
  {
    id: 'fh3b24uh32b',
    icon: <SearchIcon />,
    name: 'Search',
    link: '/search'
  },
  {
    id: '32ub423jknekn',
    icon: <AddIcon />,
    name: 'Watchlist',
    link: '/watchlist'
  },
  {
    id: '213hgu2hjrbhb',
    icon: <TheatersIcon />,
    name: 'Movies',
    link: '/movies'
  },
  {
    id: '3248g34yrbbgf',
    icon: <TvIcon />,
    name: 'Series',
    link: '/series'
  }
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { signOut, currentUser } = useAuth();
  console.log(currentUser);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="sticky" style={{ background: '#2E3B55' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              {routes.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.link} textAlign="center">
                    <Icon>{page.icon}</Icon>
                    <Button>{page.name}</Button>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.map((page) => (
              <Link
                href={page.link}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, color: 'white', display: 'block' }}>
                <Button variant="primary" sx={{ display: 'flex', gap: 1 }}>
                  <Icon sx={{ mb: 1 }}>{page.icon}</Icon>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          {!currentUser ? (
            <div>
              <Link href="/login" sx={{ color: 'white' }}>
                <Button variant="primary">Login</Button>
              </Link>
              <Link href="/register" sx={{ color: 'white' }}>
                <Button variant="primary">SignUp</Button>
              </Link>
            </div>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button href="/dashboard" textalign="center">
                    Dashboard
                  </Button>
                  <Button onClick={() => signOut()} href="/">
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
