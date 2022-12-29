import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import {
  setCharacterImg,
  setCharacterName,
  setCharacterStatus,
  setCharacterSpecies,
  setCharacterGender,
  setCharacterOrigin,
  setCharacterLocation,
  setCharacterType,
} from '../../components/slices/RandomOrStaticCharacterProfileSlice';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './RandomOrStaticCharacterProfile.css';

const RandomOrStaticCharacterProfile = () => {
  const params = useParams();
  const { characterId } = params;

  const randomOrStaticCharacterProfile = useSelector(
    (state) => state.randomOrStaticCharacterProfile
  );
  const {
    characterImg,
    characterName,
    characterStatus,
    characterSpecies,
    characterGender,
    characterOrigin,
    characterLocation,
    characterType,
  } = randomOrStaticCharacterProfile;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [characterPageError, setCharacterPageError] = useState('');

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          dispatch(setCharacterImg(response.data.image));
          dispatch(setCharacterName(response.data.name));
          dispatch(setCharacterStatus(response.data.status));
          dispatch(setCharacterSpecies(response.data.species));
          dispatch(setCharacterGender(response.data.gender));
          dispatch(setCharacterOrigin(response.data.origin.name));
          dispatch(setCharacterLocation(response.data.location.name));
          dispatch(setCharacterType(response.data.type));
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setLoading(false);
            setCharacterPageError(error.response.data.error);
          }
        } else if (error.request) {
          setLoading(false);
          setCharacterPageError('No response received');
        } else {
          setLoading(false);
          setCharacterPageError(error.message);
        }
      });
  }, [characterId, dispatch]);

  const showCharacterHoverColor = () => {
    if (showCharacterStatus() === 'random-or-static-green') {
      return '0 0 25px #2e7d32';
    } else if (showCharacterStatus() === 'random-or-static-red') {
      return '0 0 25px #d32f2f';
    } else {
      return '0 0 25px #1976d2';
    }
  };

  const showCharacterStatus = () => {
    let className = '';
    if (characterStatus === 'Alive') {
      className = 'random-or-static-green';
    } else if (characterStatus === 'Dead') {
      className = 'random-or-static-red';
    } else {
      className = 'random-or-static-gray';
    }
    return className;
  };

  const showCharacterGender = () => {
    return characterGender.charAt(0).toUpperCase() + characterGender.slice(1);
  };

  const showCharacterSpecies = () => {
    return characterSpecies.charAt(0).toUpperCase() + characterSpecies.slice(1);
  };

  const showCharacterLocation = () => {
    return (
      characterLocation.charAt(0).toUpperCase() + characterLocation.slice(1)
    );
  };

  const showCharacterOrigin = () => {
    return characterOrigin.charAt(0).toUpperCase() + characterOrigin.slice(1);
  };

  const showCharacterType = () => {
    return characterType.charAt(0).toUpperCase() + characterType.slice(1) === ''
      ? 'Unknown'
      : characterType.charAt(0).toUpperCase() + characterType.slice(1);
  };

  return (
    <Box>
      <Backdrop
        sx={{ color: '#2e7d32', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          height: '100vh',
          backgroundColor: '#202329',
        }}
      >
        <Navbar />
        {!characterPageError ? (
          <Stack
            direction="row"
            sx={{
              display: { xs: 'block', lg: 'flex' },
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%)',
              width: { xs: '300px', lg: '860px' },
              height: { xs: '600px', lg: '330px' },
              my: { xs: 5, lg: 15 },
              borderRadius: '10px',
              backgroundColor: '#3c3e44',
              boxShadow: '0px 0px 25px black',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: showCharacterHoverColor(),
              },
            }}
          >
            <Box
              sx={{
                width: { xs: '300px', lg: '330px' },
              }}
            >
              <img
                src={characterImg}
                alt={characterName}
                className="random-or-static-character-image"
              />
            </Box>
            <Stack
              justifyContent="center"
              sx={{
                mx: 'auto',
                my: 1,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              <Box sx={{ mb: 2, fontSize: '25px', color: 'white' }}>
                {characterName}
              </Box>
              <Box sx={{ mb: 2, color: 'white' }}>
                <Box className={showCharacterStatus()}></Box>
                {showCharacterGender()} - {showCharacterSpecies()}
              </Box>
              <Box sx={{ mb: 2, color: 'white' }}>
                <Typography
                  component="span"
                  sx={{
                    display: 'inline-block',
                    mb: 1,
                    color: '#9e9e9e',
                  }}
                >
                  Last known location:
                </Typography>
                <Box>{showCharacterLocation()}</Box>
              </Box>
              <Box sx={{ mb: 2, color: 'white' }}>
                <Typography
                  component="span"
                  sx={{
                    display: 'inline-block',
                    mb: 1,
                    color: '#9e9e9e',
                  }}
                >
                  First seen in:
                </Typography>
                <Box>{showCharacterOrigin()}</Box>
              </Box>
              <Box sx={{ mb: 2, color: 'white' }}>
                <Typography
                  component="span"
                  sx={{
                    display: 'inline-block',
                    mb: 1,
                    color: '#9e9e9e',
                  }}
                >
                  Type:
                </Typography>
                <Box>{showCharacterType()}</Box>
              </Box>
            </Stack>
          </Stack>
        ) : (
          <Typography
            variant="h5"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              textTransform: 'uppercase',
              color: 'white',
            }}
          >
            {characterPageError}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RandomOrStaticCharacterProfile;
