import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchForm from './searchForm';
import '../styles/discover.css';

// for now, discover is a functional component
function Discover(props) {
  return (
    <Grid container id="discover" justify="center" spacing={16}>
      <Grid item xs={12}>
        <Typography variant="display4" align="center">
          Discover
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SearchForm />
      </Grid>
    </Grid>
  );
}

export default Discover;