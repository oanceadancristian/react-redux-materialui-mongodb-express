import React from 'react';
import NavbarNoAccount from '../../components/NavbarNoAccount';
import Buttons from '../../components/Buttons';
import HomepageNoAccounNoBackgroundtImage from '../../images/homepage-no-account-no-background.png';
import Box from '@mui/system/Box';
import './HomepageNoAccount.css';

const HomepageNoAccount = () => {
  return (
    <Box>
      <NavbarNoAccount />
      <img
        src={HomepageNoAccounNoBackgroundtImage}
        alt="Rick And Morty"
        className="homepage-no-account-no-background-image"
      />
      <Buttons />
    </Box>
  );
};

export default HomepageNoAccount;
