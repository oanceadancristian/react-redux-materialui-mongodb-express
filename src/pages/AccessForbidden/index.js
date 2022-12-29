import React from 'react';
import NavbarNoAccount from '../../components/NavbarNoAccount';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BugReportIcon from '@mui/icons-material/BugReport';
import Buttons from '../../components/Buttons';

const AccessForbidden = () => {
  return (
    <Box>
      <NavbarNoAccount />
      <Box
        mt={15}
        sx={{
          textAlign: 'center',
          color: 'black',
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ color: '#2e7d32' }}
        >
          {' '}
          <BugReportIcon sx={{ fontSize: '50px' }} />
          <Typography variant="h3" mb={2}>
            403
          </Typography>
        </Stack>
        <Typography variant="h4" mb={2} sx={{ textTransform: 'uppercase' }}>
          Access forbidden
        </Typography>
        <Typography variant="p" sx={{ fontSize: '20px' }}>
          We're sorry, you don't have access to the page you requested.
        </Typography>
      </Box>
      <Buttons />
    </Box>
  );
};

export default AccessForbidden;
