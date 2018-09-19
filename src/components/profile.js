import React from 'react';
import Grid from '@material-ui/core/Grid';

// for now, home is a functional component
function Profile(props) {
  return (
    <Grid container style={{ flexGrow: 1 }} spacing={16}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={16}>
          <p> PLACEHOLDER </p>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Profile;