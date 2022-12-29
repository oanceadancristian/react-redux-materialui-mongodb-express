import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/system/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MovieIcon from '@mui/icons-material/Movie';

const SelectEpisode = (props) => {
  const { total, episodeId, setEpisodeId } = props;

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      navigate('/episodes/1');
    } else {
      setValue(params.episodeId);
      setEpisodeId(params.episodeId);
    }
  }, [params, navigate, setEpisodeId]);

  const [value, setValue] = useState(episodeId);

  const handleChange = (e) => {
    setValue(e.target.value);
    setEpisodeId(e.target.value);
    navigate(`/episodes/${e.target.value}`);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          mb: 2,
          p: 2,
          fontSize: {
            xs: '16px',
            sm: '16px',
            md: '17px',
            lg: '18px',
            xl: '18px',
          },
          fontFamily: 'monospace',
          borderRadius: 3,
          color: 'white',
          backgroundColor: '#3c3e44',
        }}
      >
        <MovieIcon fontSize="medium" sx={{ mr: 0.5 }} />
        Select episode
      </Stack>
      <Box>
        <Box sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                fontFamily: 'monospace',
                '&.Mui-focused': {
                  color: 'black',
                },
              }}
            >
              Choose...
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Choose..."
              value={value}
              onChange={handleChange}
              sx={{
                fontFamily: 'monospace',
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              }}
            >
              {[...Array(total).keys()].map((number, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={number + 1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      fontFamily: 'monospace',
                      '&:hover': {
                        color: 'white',
                        backgroundColor: '#1b5e20',
                      },
                    }}
                  >
                    Episode - {number + 1}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectEpisode;
