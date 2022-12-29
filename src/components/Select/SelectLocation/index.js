import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/system/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PlaceIcon from '@mui/icons-material/LocationOn';

const SelectLocation = (props) => {
  const { total, locationId, setLocationId } = props;

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      navigate('/locations/1');
    } else {
      setValue(params.locationId);
      setLocationId(params.locationId);
    }
  }, [params, navigate, setLocationId]);

  const [value, setValue] = useState(locationId);

  const handleChange = (e) => {
    setValue(e.target.value);
    setLocationId(e.target.value);
    navigate(`/locations/${e.target.value}`);
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
          borderRadius: 3,
          fontSize: {
            xs: '16px',
            sm: '16px',
            md: '17px',
            lg: '18px',
            xl: '18px',
          },
          fontFamily: 'monospace',
          color: 'white',
          backgroundColor: '#3c3e44',
        }}
      >
        <PlaceIcon fontSize="medium" sx={{ mr: 0.5 }} />
        Select location
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
                    Location - {number + 1}
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

export default SelectLocation;
