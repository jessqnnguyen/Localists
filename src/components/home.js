import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LoginForm from './loginForm';
import SignUpForm from './signUpForm';
import Welcome from './welcome';
import firebase from 'firebase/app';
require('firebase/auth')

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
