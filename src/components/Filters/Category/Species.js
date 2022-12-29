import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import FilterButton from './FilterButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

const Species = (props) => {
  const { expandedSpecies, handleExpandedSpecies, setSpecies, setPageNumber } =
    props;

  const speciesList = [
    'Human',
    'Alien',
    'Humanoid',
    'Poopybutthole',
    'Mythological',
    'Unknown species',
    'Animal',
    'Disease',
    'Robot',
    'Croneberg',
    'Planet',
  ];

  const location = useLocation();

  useEffect(() => {
    location.pathname = '/characters/pages/1';
  }, [location]);

  const [queryParams, setQueryParamas] = useSearchParams();

  const handleSpeciesChange = (e) => {
    localStorage.setItem('Species', e.target.value);

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
  };

  return (
    <Accordion
      sx={{ color: 'white', backgroundColor: '#3c3e44' }}
      expanded={expandedSpecies}
      onChange={handleExpandedSpecies}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography
          component={'span'}
          sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}
        >
          Species
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component={'span'}>
          <FormControl onChange={handleSpeciesChange}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              sx={{ display: 'block' }}
            >
              {speciesList.map((element, index) => (
                <FilterButton
                  action={setSpecies}
                  setPageNumber={setPageNumber}
                  key={index}
                  element={element}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Species;
