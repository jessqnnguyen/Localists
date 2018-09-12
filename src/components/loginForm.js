import React, {Component} from 'react';
// route-related
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase/app';

class LoginForm extends Component {
    
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

    login = () => {
        console.log(this.state);

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(function(something){
            console.log(something);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
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
        return(
            <Paper>
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
                <Button onClick={() => this.setState({ open: false })} color="primary">Cancel</Button>
                <Button onClick={() => this.login()} color="primary">Login</Button>
            </Paper>
         );
    }
}

export default LoginForm;