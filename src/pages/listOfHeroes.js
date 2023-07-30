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
import { getListOfHeroesAsync, getHeroByIdAsync } from '../store/slices/heroes.js';

import Hero from '../components/hero.js';

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

  const heroes = useSelector((state) => state.heroes.listOfHeroes);
  const isLoading = useSelector((state) => state.heroes.isLoading);
  const selectedHero = useSelector((state) => state.heroes.selectedHero);

  console.log('heroes', heroes);
  console.log('heroes.length', heroes.length);
  console.log('heroes.length === 0', heroes.length === 0);

  console.log('isLoading', isLoading);

  const dispatch = useDispatch();
  const showCardInfo = (id) => dispatch(getHeroByIdAsync(id));

  useEffect(() => {
    dispatch(getListOfHeroesAsync(pageInTable + 1));
  }, [dispatch, pageInTable]);

  const handleChangePage = (event, newPage) => {
    setPageInTable(newPage);
    console.log('pageInTable', pageInTable);
  };

  const sckeletonArray = [...Array(20)];

  const TableHeader = () => (
    <TableHead>
      <TableRow>
        <StyledTableCell>ID</StyledTableCell>
        <StyledTableCell align="left">Name</StyledTableCell>
        <StyledTableCell align="left">Status</StyledTableCell>
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
              {sckeletonArray.map((hero, index) => (
                <StyledTableRow key={`hero-card-skeleton-${index}`} component="th" scope="row">
                  <StyledTableCell>
                    <Skeleton variant="rounded" height={30} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant="rounded" height={30} />
                  </StyledTableCell>
                  <StyledTableCell>
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

  const HeroesTable = () => (
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
        {selectedHero && <Hero />}
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHeader />
            <TableBody>
              {heroes.results &&
                heroes.results.map((hero, index) => (
                  <StyledTableRow key={`hero-card-${index}`} onClick={() => showCardInfo(hero.id)} component="th" scope="row">
                    <StyledTableCell>{hero.id}</StyledTableCell>
                    <StyledTableCell align="left">{hero.name}</StyledTableCell>
                    <StyledTableCell align="left">{hero.status}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>

            <TablePagination
              rowsPerPageOptions={[20]}
              component="div"
              count={heroes.info?.count}
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

  if (isLoading && heroes.length === 0)
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

  return <>{isLoading ? <TableSkeleton /> : <HeroesTable />}</>;
}
