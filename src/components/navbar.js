import React, { Component } from 'react';
// route-related
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import firebase from 'firebase/app';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import '../styles/navbar.css';
require('firebase/auth')


export default class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openLogin: false,
      openSignUp: false,
      tabIndex: 0,
    };
  }

  render = () => {
    const theme = createMuiTheme({
      palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#FFFFFF',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          light: '#424242',
          main: '#424242',
          // dark: will be calculated from palette.secondary.main,
          contrastText: '#f50057',
        },
        // error: will use the default color
      },
    });
    return (
      <MuiThemeProvider theme={theme}>
        <div className="navBar">
          <AppBar position="sticky" color="primary">
            <Toolbar disableGutters>
              <img src="http://res.cloudinary.com/noctisvirtus/image/upload/v1536746811/logo.jpg"/>
              <Tabs className="tabs"
                value={this.state.tabIndex}
                onChange={(event, tabIndex) => { tabIndex < 2 && this.setState({ tabIndex }) }}
                textColor="secondary"
              >
                <Tab label="Home" component={Link} to={routes.HOME} />
                <Tab label="Discover" component={Link} to={routes.DISCOVER} />
                <Tab label="My Lists" component={Link} to={routes.MANAGELISTS} />
              </Tabs>
              <LogInOrOut />
            </Toolbar>
          </AppBar>
          <br />
        </div>
      </MuiThemeProvider>
    );
  }
}


function LogInOrOut(props) {
  // TODO: replace "/default" with the id of currently logged in user (if we can get id from firebase)
  // otherwise, we should define a username field for every user
  if (JSON.parse(sessionStorage.loggedIn) === true) {
    return (
      <div className="loginSection">
        <section>
          <Link to={routes.PROFILE+"/"+"default"}> <IconButton> <AccountCircle /> </IconButton></Link>
          <Button onClick={() => firebase.auth().signOut()}> Log Out </Button>
        </section>
      </div>
    );
  }
  return (
    <div className="loginSection">
      <section>
        <Button component={Link} to={routes.LOGIN}> Log In </Button>
        <Button component={Link} to={routes.HOME}> Sign Up </Button>
      </section>
    </div>
  );
}