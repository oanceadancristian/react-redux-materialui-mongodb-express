import React from 'react';
import Navbar from '../../components/Navbar';
import EditProfileForm from '../EditProfile/EditProfileForm';
import Box from '@mui/system/Box';

const EditProfile = () => {
  return (
    <Box sx={{ height: '100vh' }}>
      <Navbar />
      <EditProfileForm />
    </Box>
  );
};

export default EditProfile;
