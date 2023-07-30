import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListOfEpisodesAsync } from '../store/slices/episodes.js';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e8d5b2',
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function BasicTable() {
  const rowsPerPage = 20;
  const [pageInTable, setPageInTable] = useState(0);

  const episodes = useSelector((state) => state.episodes.listOfEpisodes);
  const isLoading = useSelector((state) => state.episodes.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListOfEpisodesAsync(pageInTable + 1));
  }, [dispatch, pageInTable]);

  const handleChangePage = (event, newPage) => {
    console.log('newPage', newPage);
    setPageInTable(newPage);
    console.log('pageInTable', pageInTable);
  };

  const sckeletonArray = [...Array(20)];

  const TableHeader = () => (
    <TableHead>
      <TableRow>
        <StyledTableCell>ID</StyledTableCell>
        <StyledTableCell align="left">Episode</StyledTableCell>
      </TableRow>
    </TableHead>
  );

  const TableSkeleton = () => (
    <Container maxWidth="sm">
      <Box
        sx={{
          width: 650,
          bgcolor: '#fdf5e6',
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          mt: 4,
        }}
      >
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHeader />
            <TableBody>
              {sckeletonArray.map((episode, index) => (
                <StyledTableRow key={`hero-card-${index}`}>
                  <StyledTableCell component="th" scope="row">
                    <Skeleton variant="rounded" height={30} />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rounded" height={30} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );

  const EpisodesTable = () => (
    <Container maxWidth="sm">
      <Box
        sx={{
          width: 650,
          bgcolor: '#fdf5e6',
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          mt: 4,
        }}
      >
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHeader />
            <TableBody>
              {episodes.results &&
                episodes.results.map((episode, index) => (
                  <StyledTableRow key={`hero-card-${index}`}>
                    <StyledTableCell component="th" scope="row">
                      {episode.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{episode.name}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>

            <TablePagination
              rowsPerPageOptions={[20]}
              component="div"
              count={episodes.info?.count}
              page={pageInTable}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              showFirstButton={true}
              showLastButton={true}
            />
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );

  if (isLoading && episodes.length === 0)
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 5,
            mt: 5,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      </Container>
    );

  return <>{isLoading ? <TableSkeleton /> : <EpisodesTable />}</>;
}
