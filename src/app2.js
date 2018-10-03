import React, { Component } from 'react';
import NavBar from './components/nav_bar';
import LoginForm from './components/login_form';
import Dashboard from './components/dashboard';
import RegisterForm from './components/register_form';
// Route related
import {Switch, Route} from 'react-router-dom';
import * as routes from './constants/routes';
import firebase from 'firebase/app';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import './styles/styles.css';
require('firebase/auth')

export default class App extends Component {
   

    render() {
      return (
        <div>
            <NavBar/>
            <div class="content">
            <Switch>
                <Route exact  path={routes.HOME} component={Dashboard}></Route>
                <Route exact path={routes.LOGIN} component={LoginForm}></Route>
                <Route exact path={routes.REGISTER} component={RegisterForm}></Route>
            </Switch>
            </div>
        </div>
      );
    }
  }
