import React, {Component} from 'react';
// route-related
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
        <Paper style={{flexGrow: 1}}>
          <Tabs
            value={this.state.tabIndex}
            onChange={(event, tabIndex) => {tabIndex < 2 && this.setState({ tabIndex })}}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Home" component={Link} to={routes.HOME} />
            <Tab label="Discover" component={Link} to={routes.DISCOVER} />
            <Tab label="Login" onClick={() => this.loginForm.current.open()} />
            <Tab label="Sign Up" onClick={() => this.signUpForm.current.open()} />
          </Tabs>
        </Paper>
        
        <br/>

        <LoginForm ref={this.loginForm}/>

        <SignUpForm ref={this.signUpForm} />
        
      </div>
    );
  }
}

export default NavBar;