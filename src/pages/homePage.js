import * as React from 'react';

import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import logo from '../images/rikAndMorti.png';

const HomePage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          width: 350,
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          mt: 4,
          textAlign: 'center',
        }}
      >
        <Card>
          <CardMedia sx={{ height: 140 }} image={logo} />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Rick and Morty
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Page for Rick and Morty fans
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/heroes" variant="contained">
              List of charakters
            </Button>
            <Button size="small" href="/episodes" variant="contained">
              List of episodes
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default HomePage;
