import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Stack
      direction="column"
      sx={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '50px',
        gap: 3,
        py: 6,
        mt: 3,
        backgroundColor: '#202329',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          gap: 3,
        }}
      >
        <Box sx={{ marginLeft: '10px', textAlign: 'center' }}>
          <NavLink
            to={`/characters/pages/1`}
            className={({ isActive }) =>
              isActive ? 'footer-active' : 'footer-inactive'
            }
          >
            Characters: 826
          </NavLink>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <NavLink
            to={`/episodes`}
            className={({ isActive }) =>
              isActive ? 'footer-active' : 'footer-inactive'
            }
          >
            Episodes: 51
          </NavLink>
        </Box>
        <Box sx={{ marginRight: '10px', textAlign: 'center' }}>
          <NavLink
            to={`/locations`}
            className={({ isActive }) =>
              isActive ? 'footer-active' : 'footer-inactive'
            }
          >
            Locations: 126
          </NavLink>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Box>
          <Link href="https://github.com/oanceadancristian" target="_blank">
            <GitHubIcon
              fontSize="large"
              sx={{
                color: 'white',
                '&:hover': {
                  color: '#7eb431',
                  cursor: 'pointer',
                },
              }}
            />
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Footer;
