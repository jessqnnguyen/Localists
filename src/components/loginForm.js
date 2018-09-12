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


class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            email: "",
            password: ""
        }
    }

    open = () => {
        this.setState(() => this.setState({ open: true }));
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
            <Grid container style={{ flexGrow: 1 }} spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        <Paper className="container">
                            <Typography variant="display3" gutterBottom>
                                Log In
                </Typography>
                            <br />
                            <Divider />
                            <br />
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
                            <Button className="button" onClick={() => this.login()} color="primary" fullWidth>Login</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}

export default LoginForm;