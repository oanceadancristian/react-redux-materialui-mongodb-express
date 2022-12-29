import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SelectEpisode from '../../components/Select/SelectEpisode';
import CharacterItem from '../../components/CharacterItem';
import Footer from '../../components/Footer';
import { setEpisodeDetails } from '../../components/slices/EpisodeDetailsSlice';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const EpisodeList = () => {
  const episodes = useSelector((state) => state.episodes);
  const { episodeDetails } = episodes;
  const { air_date, name } = episodeDetails;
  const dispatch = useDispatch();

  const params = useParams();

  const [episodeId, setEpisodeId] = useState(
    params.episodeId === undefined ? 1 : params.episodeId
  );
  const [characterList, setCharacterList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [episodeFound, setEpisodeFound] = useState(true);

  const [characterPageError, setCharacterPageError] = useState('');

  useEffect(() => {
    if (episodeId > 51) {
      setLoading(false);
      setEpisodeFound(false);
      setCharacterPageError('Episode not found!');
    }
  }, [episodeId]);

  useEffect(() => {
    const getEpisodeCharacters = async () => {
      const episodeData = await fetch(
        `https://rickandmortyapi.com/api/episode/${episodeId}`
      )
        .then((response) => response.json())
        .catch((error) => {
          setLoading(false);
          setEpisodeFound(false);
          setCharacterPageError(error.message);
        });

      if (episodeData) {
        dispatch(setEpisodeDetails(episodeData));

        const episodeCharacterIdList = [];
        episodeData.characters.forEach((character) => {
          let episodeCharacterId = character.substring(
            character.lastIndexOf('/') + 1
          );
          episodeCharacterIdList.push(episodeCharacterId);
        });
        const endpoint = episodeCharacterIdList.toString();

        fetch(`https://rickandmortyapi.com/api/character/${endpoint}`)
          .then((response) => response.json())
          .then((data) => {
            setLoading(false);
            setEpisodeFound(true);
            setCharacterList(data);
          })
          .catch((error) => {
            setLoading(false);
            setEpisodeFound(false);
            setCharacterPageError(error.message);
          });
      }
    };

    getEpisodeCharacters();
  }, [episodeId, dispatch]);

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    localStorage.removeItem('Status');
    localStorage.removeItem('Species');
    localStorage.removeItem('Gender');
  }, []);

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <Backdrop
        sx={{ color: '#2e7d32', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar />
      {episodeFound ? (
        <Box>
          <Box sx={{ my: 6 }}>
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontSize: {
                  xs: '28px',
                  sm: '31px',
                  md: '34px',
                  lg: '37px',
                  xl: '40px',
                },
                fontFamily: 'monospace',
                textAlign: 'center',
              }}
            >
              Episode name:{' '}
              <Typography
                variant="h3"
                component="span"
                sx={{
                  display: { xs: 'block', md: 'inline-block' },
                  mt: 1,
                  fontSize: {
                    xs: '28px',
                    sm: '31px',
                    md: '34px',
                    lg: '37px',
                    xl: '40px',
                  },
                  fontFamily: 'monospace',
                  color: '#2e7d32',
                }}
              >
                {name === '' ? 'Unknown' : name}
              </Typography>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: {
                  xs: '25px',
                  sm: '28px',
                  md: '31px',
                  lg: '34px',
                  xl: '37px',
                },
                fontFamily: 'monospace',
                textAlign: 'center',
              }}
            >
              Air date:{' '}
              <Typography
                variant="h5"
                component="span"
                sx={{
                  display: { xs: 'block', md: 'inline-block' },
                  fontSize: {
                    xs: '20px',
                    sm: '25px',
                    md: '30px',
                    lg: '35px',
                    xl: '40px',
                  },
                  fontFamily: 'monospace',
                }}
              >
                {air_date === '' ? 'Unknown' : air_date}
              </Typography>
            </Typography>
          </Box>
          <Box
            justifyContent="center"
            sx={{
              display: { xs: 'block', md: 'flex' },
              gap: 3,
              mx: 6,
            }}
          >
            <Box
              sx={{
                width: { xs: '75%', md: '25%' },
                mx: { xs: 'auto' },
                mb: { xs: 5 },
              }}
            >
              <SelectEpisode
                total={51}
                episodeId={episodeId}
                setEpisodeId={setEpisodeId}
              />
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(25%, 300px))',
                justifyContent: 'center',
                columnGap: { xs: 12, md: 8 },
                rowGap: 6,
                width: { xs: '100%', md: '75%' },
                mb: 30,
              }}
            >
              <CharacterItem
                characterList={characterList}
                pathname={pathname}
              />
            </Box>
          </Box>
        </Box>
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
            color: 'black',
          }}
        >
          {characterPageError}
        </Typography>
      )}
      <Footer />
    </Box>
  );
};

export default EpisodeList;
