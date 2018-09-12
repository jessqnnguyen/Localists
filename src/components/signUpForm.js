import React, {Component} from 'react';
// route-related
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase/app';

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
            <Dialog
            open={this.state.open}
            onClose={() => this.setState({ open: false })}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.setState({ open: false })} color="primary">
                Cancel
                </Button>
                <Button onClick={() => this.signUp()} color="primary">
                Sign Up
                </Button>
            </DialogActions>
            </Dialog>
        );
    }
}

export default SignUpForm;