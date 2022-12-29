import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

function ResponsiveNavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  const location = useLocation();
  const { pathname } = location;

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('facebookToken');
    localStorage.removeItem('facebookName');
    localStorage.removeItem('facebookEmail');
    localStorage.removeItem('facebookPicture');
    localStorage.removeItem('googleUser');
    localStorage.removeItem('googleName');
    localStorage.removeItem('googleEmail');
    localStorage.removeItem('googlePicture');
    window.location = '/';
  };

  const [userId, setUserId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/get_profile').then((response) => {
      response.data.forEach((user) => {
        if (user.email === localStorage.getItem('userEmail')) {
          setUserId(user._id);
        }
      });
    });
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: '#202329' }}>
        <Toolbar disableGutters sx={{ height: '50px' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/homepage"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 700,
              fontFamily: 'monospace',
              letterSpacing: '.25rem',
              textDecoration: 'none',
              textTransform: 'uppercase',
              color: pathname === '/homepage' ? '#97ce4c' : 'white',
              '&:hover': { color: '#7eb431' },
            }}
          >
            <CameraRollIcon
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                fontSize: '25px',
              }}
            />
            Rick and Morty
          </Typography>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              flexGrow: 1,
              gap: 2,
              mr: 4,
            }}
          >
            <Link
              component={RouterLink}
              to={`/characters/pages/1`}
              sx={{ textDecoration: 'none' }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block',
                  my: 2,
                  fontSize: '20px',
                  fontFamily: 'monospace',
                  color: pathname.startsWith('/characters')
                    ? '#97ce4c'
                    : 'white',
                  '&:hover': { color: '#7eb431', backgroundColor: '#202329' },
                }}
              >
                Characters
              </Button>
            </Link>
            <Link
              component={RouterLink}
              to={`/episodes`}
              sx={{ textDecoration: 'none' }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block',
                  my: 2,
                  fontSize: '20px',
                  fontFamily: 'monospace',
                  color: pathname.startsWith('/episodes') ? '#97ce4c' : 'white',
                  '&:hover': { color: '#7eb431', backgroundColor: '#202329' },
                }}
              >
                Episodes
              </Button>
            </Link>
            <Link
              component={RouterLink}
              to={`/locations`}
              sx={{ textDecoration: 'none' }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block',
                  my: 2,
                  fontSize: '20px',
                  fontFamily: 'monospace',
                  color: pathname.startsWith('/locations')
                    ? '#97ce4c'
                    : 'white',

                  '&:hover': { color: '#7eb431', backgroundColor: '#202329' },
                }}
              >
                Locations
              </Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Open profile">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  fontSize: '20px',
                  fontFamily: 'monospace',
                  letterSpacing: '.1rem',
                  textTransform: 'uppercase',
                  color: anchorElUser ? '#97ce4c' : 'white',
                }}
              >
                <Avatar
                  sx={{ backgroundColor: '#202329' }}
                  alt={
                    localStorage.getItem('facebookPicture')
                      ? 'Facebook picture'
                      : localStorage.getItem('googlePicture')
                      ? 'Google picture'
                      : ''
                  }
                  src={
                    localStorage.getItem('facebookPicture') ||
                    localStorage.getItem('googlePicture')
                  }
                >
                  <AccountBoxIcon
                    sx={{
                      mr: 1,
                      fontSize: '30px',
                      color: anchorElUser ? '#97ce4c' : 'white',
                      '&:hover': { color: '#7eb431' },
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '40px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ mx: 2.5, mt: 1, mb: 1.5, textAlign: 'center' }}>
                <Typography component="div">
                  Signed in as{' '}
                  <Typography component="p" sx={{ fontWeight: 'bold' }}>
                    {localStorage.getItem('userEmail') ||
                      localStorage.getItem('facebookEmail') ||
                      localStorage.getItem('googleEmail')?.replace(/"/g, '')}
                  </Typography>
                </Typography>
              </Box>
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Stack alignItems="center" spacing={2}>
                  {localStorage.getItem('userEmail') ? (
                    <Link
                      component={RouterLink}
                      to={`/edit_profile/${userId}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'black',
                        '&:hover': { color: '#7eb431' },
                      }}
                    >
                      <Stack direction="row" spacing={0.5}>
                        <EditIcon />
                        <Typography
                          textAlign="center"
                          sx={{
                            fontFamily: 'monospace',
                            textTransform: 'uppercase',
                          }}
                        >
                          Edit profile
                        </Typography>
                      </Stack>
                    </Link>
                  ) : (
                    ''
                  )}
                  <Link
                    component={RouterLink}
                    onClick={handleLogout}
                    sx={{
                      textDecoration: 'none',
                      color: 'black',
                      '&:hover': { color: '#7eb431' },
                    }}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <LogoutIcon />
                      <Typography
                        textAlign="center"
                        sx={{
                          fontFamily: 'monospace',
                          textTransform: 'uppercase',
                        }}
                      >
                        Sign out
                      </Typography>
                    </Stack>
                  </Link>
                </Stack>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: anchorElNav ? '#97ce4c' : 'white',
                '&:hover': { color: '#7eb431' },
              }}
            >
              <MenuIcon sx={{ fontSize: '30px' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link
                component={RouterLink}
                to="/characters/pages/1"
                sx={{
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  color: 'black',
                  '&:hover': { color: '#7eb431' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ fontFamily: 'monospace' }}
                  >
                    Characters
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                component={RouterLink}
                to="/episodes"
                sx={{
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  color: 'black',
                  '&:hover': { color: '#7eb431' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ fontFamily: 'monospace' }}
                  >
                    Episodes
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                component={RouterLink}
                to="/locations"
                sx={{
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  color: 'black',
                  '&:hover': { color: '#7eb431' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ fontFamily: 'monospace' }}
                  >
                    Locations
                  </Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/homepage"
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              flexGrow: 1,
              fontSize: '17px',
              fontWeight: 700,
              fontFamily: 'monospace',
              letterSpacing: '.25rem',
              textDecoration: 'none',
              textTransform: 'uppercase',
              color: '#97ce4c',
            }}
          >
            <CameraRollIcon
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 1,
                fontSize: '22px',
              }}
            />
            Rick and Morty
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 0 }}>
            <Tooltip title="Open profile">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                }}
              >
                <Avatar
                  sx={{ backgroundColor: '#202329' }}
                  alt={
                    localStorage.getItem('facebookPicture')
                      ? 'Facebook picture'
                      : localStorage.getItem('googlePicture')
                      ? 'Google picture'
                      : ''
                  }
                  src={
                    localStorage.getItem('facebookPicture') ||
                    localStorage.getItem('googlePicture')
                  }
                >
                  <AccountBoxIcon
                    sx={{
                      fontSize: '30px',
                      color: anchorElUser ? '#97ce4c' : 'white',
                      '&:hover': { color: '#7eb431' },
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '40px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ mx: 2.5, mt: 1, mb: 1.5, textAlign: 'center' }}>
                <Typography component="div">
                  Signed in as{' '}
                  <Typography component="p" sx={{ fontWeight: 'bold' }}>
                    {localStorage.getItem('userEmail') ||
                      localStorage.getItem('facebookEmail') ||
                      localStorage.getItem('googleEmail')?.replace(/"/g, '')}
                  </Typography>
                </Typography>
              </Box>
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Stack alignItems="center" spacing={2}>
                  {localStorage.getItem('userEmail') ? (
                    <Link
                      component={RouterLink}
                      to={`/edit_profile/${userId}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'black',
                        '&:hover': { color: '#7eb431' },
                      }}
                    >
                      <Stack direction="row" spacing={0.5}>
                        <EditIcon />
                        <Typography
                          textAlign="center"
                          sx={{
                            fontFamily: 'monospace',
                            textTransform: 'uppercase',
                          }}
                        >
                          Edit profile
                        </Typography>
                      </Stack>
                    </Link>
                  ) : (
                    ''
                  )}
                  <Link
                    component={RouterLink}
                    onClick={handleLogout}
                    sx={{
                      textDecoration: 'none',
                      color: 'black',
                      '&:hover': { color: '#7eb431' },
                    }}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <LogoutIcon />
                      <Typography
                        textAlign="center"
                        sx={{
                          fontFamily: 'monospace',
                          textTransform: 'uppercase',
                        }}
                      >
                        Sign out
                      </Typography>
                    </Stack>
                  </Link>
                </Stack>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveNavBar;
