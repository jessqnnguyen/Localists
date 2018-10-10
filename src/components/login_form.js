import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import '../styles/login_form_styles.css';
require('firebase/auth')


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange () {
    window.location.reload();
    this.props.history.push(routes.HOME);
  }

  login = () => {
    console.log(this.state);

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.routeChange();
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error.message);
    });
  }

  register = () => {
    this.routeChange("register");
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;

    this.setState(() => ({
      [name]: target.value
    }));
  }

  render() {
    return (
      <div class="loginForm">
        <h1 class="display-4">Login</h1>
        <Form>
          <FormGroup id="emailField">
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup id="passwordField">
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
          </FormGroup>
          <div class="loginButton">
            <Button color="primary" onClick={() => this.login()}>Login</Button>
          </div>
        </Form>
        <div class="registerAccountAlert">
          <Alert color="primary">
            Don't have an account? 
            <Link to={routes.REGISTER}><a class="text-primary">Create an account now</a></Link>
          </Alert>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);