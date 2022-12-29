import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/system/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const Search = (props) => {
  const { setSearch, setPageNumber } = props;

  const [queryParams, setQueryParamas] = useSearchParams();

  const handleChange = (e) => {
    localStorage.setItem('Search', e.target.value);

    if (e.target.value === '') {
      localStorage.removeItem('Search');
    }

    setQueryParamas({
      ...queryParams,
      statusFilter:
        localStorage.getItem('Status') === null
          ? ''
          : localStorage.getItem('Status'),
      speciesFilter:
        localStorage.getItem('Species') === null
          ? ''
          : localStorage.getItem('Species'),
      genderFilter:
        localStorage.getItem('Gender') === null
          ? ''
          : localStorage.getItem('Gender'),
      search:
        localStorage.getItem('Search') === null
          ? ''
          : localStorage.getItem('Search'),
    });

    setPageNumber(1);
    setSearch(e.target.value);
  };

  const searchRef = useRef();

  const [searchIconColor, setSearchIconColor] = useState('gray');

  const handleSearchBlur = () => {
    setSearchIconColor('gray');
  };

  const handleSearchFocus = () => {
    setSearchIconColor('black');
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: '750px',
          maxWidth: '75%',
        }}
      >
        <TextField
          placeholder="Search for character"
          fullWidth
          id="fullWidth"
          inputRef={searchRef}
          onChange={handleChange}
          onBlur={handleSearchBlur}
          onFocus={handleSearchFocus}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: searchIconColor }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& label': {
              fontWeight: '600',
            },
            '& .MuiOutlinedInput-root': {
              fontFamily: 'monospace',
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default Search;
