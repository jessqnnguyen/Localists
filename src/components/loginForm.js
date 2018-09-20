import React, { Component } from 'react';
// route-related
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase/app';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './loginFormStyles.css';


class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    login = () => {
        console.log(this.state);

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push(routes.HOME);
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(error.message);
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
            <div className="loginForm">
                <div className="loginBox">
                    <Paper className="container">
                        <Typography variant="display3" gutterBottom>Log In</Typography>
                        <Divider />
                        <div className="emailField">
                            <TextField name="email" label="Email Address" type="email" 
                                fullWidth value={this.state.email} onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="passwordField">
                            <TextField className="passwordField" name="password" label="Password" type="password" fullWidth
                                    value={this.state.password} onChange={this.handleInputChange}
                            />
                        </div>
                        <Button className="button" onClick={() => this.login()} color="primary" fullWidth>Login</Button>
                    </Paper>
                </div>
            </div>

        );
    }
}

export default LoginForm;