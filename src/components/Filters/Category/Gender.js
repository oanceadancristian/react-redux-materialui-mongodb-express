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

const Gender = (props) => {
  const { expandedGender, handleExpandedGender, setGender, setPageNumber } =
    props;

  const genderList = ['Male', 'Female', 'Genderless', 'Unknown gender'];

  const location = useLocation();

  useEffect(() => {
    location.pathname = '/characters/pages/1';
  }, [location]);

  const [queryParams, setQueryParamas] = useSearchParams();

  const handleGenderChange = (e) => {
    localStorage.setItem('Gender', e.target.value);

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
      expanded={expandedGender}
      onChange={handleExpandedGender}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography
          component={'span'}
          sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}
        >
          Gender
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component={'span'}>
          <FormControl onChange={handleGenderChange}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              sx={{ display: 'block' }}
            >
              {genderList.map((element, index) => (
                <FilterButton
                  action={setGender}
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

export default Gender;
