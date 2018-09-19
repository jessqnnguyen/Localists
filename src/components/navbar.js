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
require('firebase/auth')


class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openLogin: false,
      openSignUp: false,
      tabIndex: 0,
    };
  }

  render = () => {
    return (
      <div>
        <AppBar
          position="sticky"
          style={{ flexGrow: 1 }}
          color="default"
        >
          <Toolbar disableGutters={true}>
            <img 
              style={{ width: 120, padding: 10 }} 
              src="http://res.cloudinary.com/noctisvirtus/image/upload/v1536746811/logo.jpg" 
              alt="logo"
            />
            <Tabs
              value={this.state.tabIndex}
              onChange={(event, tabIndex) => { tabIndex < 2 && this.setState({ tabIndex }) }}
              indicatorColor="primary"
              textColor="primary"
              style={{ flexGrow: 1 }}
            >
              <Tab label="Home" component={Link} to={routes.HOME} />
              <Tab label="Discover" component={Link} to={routes.DISCOVER} />
            </Tabs>
            <LogInOrOut />

          </Toolbar>
        </AppBar>
        <br />
      </div>
    );
  }
}


function LogInOrOut(props) {

  if (JSON.parse(sessionStorage.loggedIn) === true) {
    return (
      <section>
        <Link to={routes.PROFILE}>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </Link>
        <Button onClick={() => firebase.auth().signOut()}> Log Out </Button>
      </section>
    );
  }
  return (
    <section>
      <Button component={Link} to={routes.LOGIN}> Log In </Button>
      <Button component={Link} to={routes.HOME}> Sign Up </Button>
    </section>
  );
}

export default NavBar;