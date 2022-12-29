import React from 'react';
import Navbar from '../../components/Navbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BugReportIcon from '@mui/icons-material/BugReport';
import Buttons from '../../components/Buttons';

const PageNotFound = () => {
  return (
    <Box>
      <Navbar />
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
            404
          </Typography>
        </Stack>
        <Typography variant="h4" mb={2} sx={{ textTransform: 'uppercase' }}>
          Page not found
        </Typography>
        <Typography variant="p" sx={{ fontSize: '20px' }}>
          We're sorry, the page you requested could not be found.
        </Typography>
      </Box>
      <Buttons />
    </Box>
  );
};

export default PageNotFound;
