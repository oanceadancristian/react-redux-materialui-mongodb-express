import React from 'react';
import NavbarNoAccount from '../../components/NavbarNoAccount';
import SignupForm from './SignupForm';
import Box from '@mui/system/Box';

const Signup = () => {
  return (
    <Box sx={{ height: '100vh' }}>
      <NavbarNoAccount />
      <SignupForm />
    </Box>
  );
};

export default Signup;
