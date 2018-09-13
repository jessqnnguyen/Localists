import React from 'react';
import Grid from '@material-ui/core/Grid';
import SignUpForm from './signUpForm';
import Welcome from './welcome';

// for now, home is a functional component
function Home(props) {
  return (
    <Grid container style={{ flexGrow: 1 }} spacing={16}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={16}>
          <HomeContent />
        </Grid>
      </Grid>
    </Grid>
  );
}

function HomeContent(props) {
  if (JSON.parse(sessionStorage.loggedIn) === true) {
    return <Welcome />;
  }
  return <SignUpForm />;
}

export default Home;
