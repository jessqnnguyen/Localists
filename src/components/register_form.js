import React, { Component } from 'react';
import * as routes from '../constants/routes';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import firebase from 'firebase/app';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import '../styles/register_form_styles.css';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    }
  }

  register = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      var user = firebase.auth().currentUser;
      console.log("current logged in user id = " + user.uid);
      var db = firebase.database();
      db.ref('users/' + user.uid).set({
        name: this.state.name,
        email: this.state.email,
      }).then(() => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.props.history.push(routes.HOME);
        });
      })
    })
    .catch(function (error) {
      // should only get here if email has already been taken
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
  }

  handleInputChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
  }

  render() {
    return (
      <div class="registerForm">
        <h1 class="display-4">Register</h1>
        <AvForm onValidSubmit={this.register}>
          <AvField 
            label="Name" id="nameField" name="name" 
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })} 
            validate={{
              required: {value: true, errorMessage: "Please enter your name"},
              pattern: {value: '^[A-Za-z0-9]+$', errorMessage: "Invalid characters in name"},
            }}
          />
          <AvField 
            label="Email" id="registerEmailField" name="email" type="email" 
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })} 
            validate={{
              required: {value: true, errorMessage: "Please enter your email"},
              email: true
            }}
            errorMessage="Invalid email"
          />
          <AvField 
            label="Password" id="passwordField" name="password" type="password" 
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })} 
            validate={{
              required: {value: true, errorMessage: "Please enter your password"},
              minLength: {value: 6, errorMessage: "Minimum 6 character password"}
            }} 
          />
          <div class="registerButton">
            <Button color="primary">Submit</Button>
          </div>
        </AvForm>
      </div>
    );
  }
}
