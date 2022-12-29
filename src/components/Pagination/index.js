import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import './Pagination.css';

const Pagination = (props) => {
  const { info, pageNumber, setPageNumber } = props;
  const { pages } = info;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  const params = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      navigate('/characters/pages/1');
    }
  }, [navigate, params]);

  const handlePageChange = (data) => {
    setPageNumber(data.selected + 1);
    navigate(`/characters/pages/${data.selected + 1}${location.search}`);
  };

  const [paginationWidth, setPaginationWidth] = useState(window.innerWidth);

  const updatePaginationWidth = () => {
    setPaginationWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updatePaginationWidth);

    return () => window.removeEventListener('resize', updatePaginationWidth);
  }, []);

  return (
    <Box sx={{ mb: 30 }}>
      <ReactPaginate
        className="pagination"
        previousLabel="Prev"
        nextLabel="Next"
        previousClassName="prev-btn"
        nextClassName="next-btn"
        pageLinkClassName="page-link"
        activeLinkClassName="page-active-link"
        onPageChange={handlePageChange}
        forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
        pageCount={pages}
        marginPagesDisplayed={paginationWidth < 900 ? 1 : 2}
        pageRangeDisplayed={1}
      />
    </Box>
  );
};

export default Pagination;
