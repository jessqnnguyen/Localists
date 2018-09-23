import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchForm from './searchForm';
import '../styles/discover.css';

// for now, discover is a functional component
function Discover(props) {
  return (
    <Grid container id="discover" direction="column" justify="center" alignItems="center" spacing={16}>
      <Grid item>
        <Typography variant="display4" align="center">
          Discover
        </Typography>
      </Grid>
      <Grid item>
        <SearchForm />
      </Grid>
    </Grid>
  );
}

export default Discover;