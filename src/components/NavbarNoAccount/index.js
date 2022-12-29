import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import Avatar from '@mui/material/Avatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function ResponsiveNavBarNoAccount() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: '#202329' }}>
        <Toolbar disableGutters sx={{ height: '50px' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              flexGrow: 1,
              fontSize: '22px',
              fontWeight: 700,
              fontFamily: 'monospace',
              letterSpacing: '.1rem',
              textDecoration: 'none',
              textTransform: 'uppercase',
              color: '#97ce4c',
              '&:hover': {
                color: '#7eb431',
              },
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
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0 }}>
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
                <Avatar sx={{ backgroundColor: '#202329' }}>
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  component={RouterLink}
                  to="/signin"
                  sx={{
                    textDecoration: 'none',
                    color: 'black',
                    '&:hover': { color: '#7eb431' },
                  }}
                >
                  <Stack direction="row" spacing={0.5}>
                    <LoginOutlinedIcon />
                    <Typography
                      textAlign="center"
                      sx={{
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                      }}
                    >
                      Sign in
                    </Typography>
                  </Stack>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    textDecoration: 'none',
                    color: 'black',
                    '&:hover': { color: '#7eb431' },
                  }}
                >
                  <Stack direction="row" spacing={0.5}>
                    <PersonAddIcon />
                    <Typography
                      textAlign="center"
                      sx={{ textTransform: 'uppercase' }}
                    >
                      Sign up
                    </Typography>
                  </Stack>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              flexGrow: 1,
              fontSize: '17px',
              fontWeight: 700,
              fontFamily: 'monospace',
              letterSpacing: '.1rem',
              textDecoration: 'none',
              textTransform: 'uppercase',
              color: '#97ce4c',
              '&:hover': {
                color: '#7eb431',
              },
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
                <Avatar sx={{ backgroundColor: '#202329' }}>
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  component={RouterLink}
                  to="/signin"
                  sx={{
                    textDecoration: 'none',
                    color: 'black',
                    '&:hover': { color: '#7eb431' },
                  }}
                >
                  <Stack direction="row" spacing={0.5}>
                    <LoginOutlinedIcon />
                    <Typography
                      textAlign="center"
                      sx={{
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                      }}
                    >
                      Sign in
                    </Typography>
                  </Stack>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    textDecoration: 'none',
                    color: 'black',
                    '&:hover': { color: '#7eb431' },
                  }}
                >
                  <Stack direction="row" spacing={0.5}>
                    <PersonAddIcon />
                    <Typography
                      textAlign="center"
                      sx={{ textTransform: 'uppercase' }}
                    >
                      Sign up
                    </Typography>
                  </Stack>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveNavBarNoAccount;
