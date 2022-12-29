import React from 'react';
import NavbarNoAccount from '../../components/NavbarNoAccount';
import SigninForm from './SigninForm';
import Box from '@mui/system/Box';

const Signin = () => {
  return (
    <Box sx={{ height: '100vh' }}>
      <NavbarNoAccount />
      <SigninForm />
    </Box>
  );
};

export default Signin;
