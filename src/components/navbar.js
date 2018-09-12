import React, {Component} from 'react';
// route-related
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import SignUpForm from './signUpForm';
import LoginForm from './loginForm';


class NavBar extends Component {
  
  constructor(props) {
    super(props);

    this.signUpForm = React.createRef();
    this.loginForm = React.createRef();

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
          style={{flexGrow: 1}}
          color="default"
        >
          <Toolbar>
            <img style={{width: 120}} src="http://res.cloudinary.com/noctisvirtus/image/upload/v1536746811/logo.jpg" />
            <Tabs
              value={this.state.tabIndex}
              onChange={(event, tabIndex) => {tabIndex < 2 && this.setState({ tabIndex })}}
              indicatorColor="primary"
              textColor="primary"
              centered
              style={{flexGrow: 1}}
            >
              <Tab label="Home" component={Link} to={routes.HOME} />
              <Tab label="Discover" component={Link} to={routes.DISCOVER} />
              <Tab label="Login" onClick={() => this.loginForm.current.open()} />
              <Tab label="Sign Up" onClick={() => this.signUpForm.current.open()} />
            </Tabs>
          </Toolbar>
        </AppBar>
        
        <br/>

        <LoginForm ref={this.loginForm} />
        <SignUpForm ref={this.signUpForm} />
        
      </div>
    );
  }
}

export default NavBar;