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
import '../styles/register_form_styles.css';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: ""
    }
  }

  register(email, password, name) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      var user = firebase.auth().currentUser;
      console.log("current logged in user id = " + user.uid);
      var db = firebase.database();
      db.ref('users/' + user.uid).set({
        name: name,
        email: email,
      }).then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.history.push(routes.HOME);
        });
      })

      // SAVING A USER TO DATABASE - FIRESTORE VERSION: left here if we want to refactor stuff later
      // firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
      //   name: name,
      //   email: email
      // }, {merge:true}).then(() => firebase.auth().signInWithEmailAndPassword(email, password).then(() => this.props.history.push(routes.HOME)));
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  handleInputChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
  }

  render() {
    return (
      <div class="registerForm">
        <h1 class="display-4">Register</h1>
        <Form>
          <FormGroup id="nameField">
            <Label for="nameField">Name</Label>
            <Input type="name" name="name" id="name" placeholder="Jane Doe" value={this.state.name} onChange={event => this.setState({ name: event.target.value })}/>
          </FormGroup>
          <FormGroup id="registerEmailField">
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="jane@example.com" value={this.state.email} onChange={event => this.setState({ email: event.target.value })}/>
          </FormGroup>
          <FormGroup id="passwordField">
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password" value={this.state.password} onChange={event => this.setState({ password: event.target.value })}/>
          </FormGroup>
          <div class="registerButton">
            <Button color="primary" onClick={() => this.register(this.state.email, this.state.password, this.state.name)}>Submit</Button>
          </div>
        </Form>
      </div>
    );
  }
}