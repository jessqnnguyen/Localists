import React, { Component } from 'react';
import * as routes from '../constants/routes';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard';
import firebase from 'firebase/app';
import '../styles/register_form_styles.css';
require('firebase/auth')

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
            var db = firebase.database();
            db.ref('users/' + user.uid).set({
                name: name,
                email: email
            }).then(() => {
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    window.location.reload()
                    this.props.history.push(routes.HOME);
                });
            });
        })
        .catch(function (error) {
            
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // alert(errorMessage);
        });
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
        <div class="registerForm">
            <h1 class="display-4">Register</h1>
            <Form>
                <FormGroup id="nameField">
                    <Label for="nameField">Name</Label>
                    <Input type="name" name="name" id="name" placeholder="Jane Doe" value={this.state.name} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup id="registerEmailField">
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="jane@example.com" value={this.state.email} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup id="passwordField">
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password" value={this.state.password} onChange={this.handleInputChange}/>
                </FormGroup>
                <div class="registerButton">
                    <Button color="primary" onClick={this.register(this.state.email, this.state.password, this.state.name)}>Submit</Button>
                </div>
            </Form>
        </div>
      );
    }
}