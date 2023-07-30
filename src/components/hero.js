import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeSelectedHero } from '../store/slices/heroes.js';
import './component.css';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Hero() {
  const hero = useSelector((state) => state.heroes.selectedHero);
  const error = useSelector((state) => state.heroes.errorInSelectedHero);

  const dispatch = useDispatch();

  if (error) {
    console.log('error from hero', error);
    return <h1 style={{ color: 'red' }}>We have a problem</h1>;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          // width: 350,
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          mt: 2,
          mb: 4,
          // mx: 0,
          // textAlign: 'center',
        }}
      >
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={4}>
            <img src={`${hero.image}`} alt="Img" className="heroImage"></img>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5">{hero.name}</Typography>
            <Typography variant="subtitle1">
              <b>Status:</b> {hero.status}
            </Typography>
            <Typography variant="subtitle1">
              <b>Species:</b> {hero.species}
            </Typography>
            <Typography variant="subtitle1">
              <b>Gender:</b> {hero.gender}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              size="medium"
              color="success"
              variant="contained"
              onClick={() => {
                dispatch(closeSelectedHero());
              }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
