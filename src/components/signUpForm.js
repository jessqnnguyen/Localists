import '../index.css';

import React, { Component } from 'react';
// route-related
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import firebase from 'firebase/app';
import { Grid } from '@material-ui/core';
require('firebase/auth')


class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            email: "",
            name: "",
            password: ""
        }
    }

    open = () => {
        this.setState(() => this.setState({ open: true }));
    }

    signUp = () => {
        console.log(this.state);

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(function (something) {
                console.log(something);
            })
            .catch(function (error) {
                // Handle Errors here.
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
            <Paper className="container">

                <Typography variant="display3" gutterBottom>
                    Welcome to Localists
                </Typography>
                <Typography variant="subheading" gutterBottom>
                    Create and share a list of your favourite places today!
                </Typography>
                <br/>
                <Divider />
                <br/>
                <TextField
                    name="name"
                    label="Name"
                    fullWidth
                    value={this.state.name}
                    onChange={this.handleInputChange}
                />
                <TextField
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleInputChange}
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={this.state.password}
                    onChange={this.handleInputChange}
                />
                <br/>
                <br/>
                <Button className="button" onClick={() => this.signUp()} color="primary" fullWidth>
                    Sign Up
                </Button>
            </Paper>
        );
    }
}



export default SignUpForm;