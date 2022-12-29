import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Search from '../../components/Search';
import Filters from '../../components/Filters';
import CharacterItem from '../../components/CharacterItem';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';
import {
  setCharacterList,
  setInfo,
} from '../../components/slices/CharacterListSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const CharacterList = () => {
  const characters = useSelector((state) => state.characters);
  const { characterList, info } = characters;
  const dispatch = useDispatch();

  const params = useParams();

  const [pageNumber, setPageNumber] = useState(
    params.pageId === undefined ? 1 : params.pageId
  );
  const [search, setSearch] = useState('');

  const [status, setStatus] = useState(
    localStorage.getItem('Status') === null
      ? ''
      : localStorage.getItem('Status').slice(0, 7)
  );
  const [species, setSpecies] = useState(
    localStorage.getItem('Species') === null
      ? ''
      : localStorage.getItem('Species').slice(0, 7)
  );
  const [gender, setGender] = useState(
    localStorage.getItem('Gender') === null
      ? ''
      : localStorage.getItem('Gender').slice(0, 7)
  );

  const [loading, setLoading] = useState(true);

  const [characterPageError, setCharacterPageError] = useState('');

  useEffect(() => {
    setPageNumber(params.pageId);

    axios
      .get(
        `https:/rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`
      )
      .then((response) => {
        const {
          status,
          data: { results, info },
        } = response;
        if (status === 200) {
          setLoading(false);
          dispatch(setCharacterList(results));
          dispatch(setInfo(info));
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
  }, [params.pageId, pageNumber, search, status, gender, species, dispatch]);

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <Backdrop
        sx={{ color: '#2e7d32', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar />
      {!characterPageError ? (
        <Box>
          <Box sx={{ mt: 10 }}>
            <Search setSearch={setSearch} setPageNumber={setPageNumber} />
          </Box>
          <Box
            justifyContent="center"
            sx={{
              display: { xs: 'block', md: 'flex' },
              gap: 3,
              mx: 6,
              my: 10,
            }}
          >
            <Box
              sx={{
                width: { xs: '75%', md: '25%' },
                mx: { xs: 'auto' },
                mb: { xs: 5 },
              }}
            >
              <Filters
                setStatus={setStatus}
                setSpecies={setSpecies}
                setGender={setGender}
                setPageNumber={setPageNumber}
              />
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(25%, 300px))',
                justifyContent: 'space-evenly',
                columnGap: { sm: 12, md: 3, lg: 0, xl: 4 },
                rowGap: 6,
                width: { xs: '100%', md: '75%' },
              }}
            >
              <CharacterItem characterList={characterList} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              info={info}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
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

export default CharacterList;
