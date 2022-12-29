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

const Status = (props) => {
  const { expandedStatus, handleExpandedStatus, setStatus, setPageNumber } =
    props;

  const statusList = ['Alive', 'Dead', 'Unknown status'];

  const location = useLocation();

  useEffect(() => {
    location.pathname = '/characters/pages/1';
  }, [location]);

  const [queryParams, setQueryParamas] = useSearchParams();

  const handleStatusChange = (e) => {
    localStorage.setItem('Status', e.target.value);

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
      expanded={expandedStatus}
      onChange={handleExpandedStatus}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          component={'span'}
          sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}
        >
          Status
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component={'span'}>
          <FormControl onChange={handleStatusChange}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              sx={{ display: 'block' }}
            >
              {statusList.map((element, index) => (
                <FilterButton
                  key={index}
                  action={setStatus}
                  setPageNumber={setPageNumber}
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

export default Status;
