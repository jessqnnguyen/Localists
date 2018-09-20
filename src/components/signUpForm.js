import React, {Component} from 'react';
// route-related
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase/app';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import './signUpForm.css'


require('firebase/auth')


class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name: "",
            password: ""
        }
    }

    signUp = (email, password, name) => {

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
                    });
                });
            })
            .catch(function (error) {
                
                var errorCode = error.code;
                var errorMessage = error.message;

                alert(errorMessage);
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
            <div className="welcomeRegisterBox">
                <Paper className="container">
                    <Typography variant="display3" gutterBottom>
                        Welcome to Localists
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                        Create and share a list of your favourite places today!
                    </Typography>
                    <Divider />
                    <div className="nameField">
                        <TextField name="name" label="Name" fullWidth value={this.state.name} 
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="emailField">
                        <TextField name="email" label="Email Address" type="email" fullWidth
                                    value={this.state.email} onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="passwordField">
                        <TextField name="password" label="Password" type="password" fullWidth 
                            value={this.state.password} onChange={this.handleInputChange}
                        />
                    </div>
                    <Button className="button" onClick={() => this.signUp(this.state.email, this.state.password, this.state.name)} color="primary" fullWidth>
                        Sign Up
                    </Button>
                </Paper>
            </div>
        );
    }
}

export default SignUpForm;