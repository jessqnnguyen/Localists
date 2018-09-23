import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchForm from './searchForm';
import '../styles/discover.css';

// for now, discover is a functional component
function Discover(props) {
  return (
    <div id="discover">
      <Grid item xs={12}>
        <Grid container justify="center">
          <Typography variant="display4">
            Discover
          </Typography>
        </Grid>
      </Grid>
      <SearchForm />
    </div>
  );
}

export default Discover;