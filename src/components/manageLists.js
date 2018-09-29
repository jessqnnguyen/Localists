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
import '../styles/signUpForm.css'
import ListCard from './listCard';


require('firebase/auth')


class ManageLists extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lists: [
                {
                    "title":"this is a title",
                    "create_date":"28/05/2018",
                    "locales":["A", "B", "C", "D", "asdf", "asdfasdf", "dsfsdfs", "asd"]
        },
        {
            "title":"this is another title",
            "create_date":"22/05/2018",
            "locales":["A", "B", "C", "D", "asdf"]
}],
            _lists_count: "2"
        }
    }

    createTable = () => {
        let lists = [];
        for (var i = 0; i < this.state.lists.length; i++) {
            lists.push(<p> {this.state.lists[i].title} </p>);
        }
        return lists
      }

    // signUp = (email, password, name) => {

    //     firebase.auth().createUserWithEmailAndPassword(email, password)
    //         .then(() => {
                
    //             var user = firebase.auth().currentUser;

    //             var db = firebase.database();
    //             db.ref('users/' + user.uid).set({
    //                 name: name,
    //                 email: email
    //             }).then(() => {
    //                 firebase.auth().signInWithEmailAndPassword(email, password)
    //                 .then(() => {
    //                     window.location.reload()
    //                 });
    //             });
    //         })
    //         .catch(function (error) {
                
    //             var errorCode = error.code;
    //             var errorMessage = error.message;

    //             alert(errorMessage);
    //         });
    // }

    // handleInputChange = (event) => {
    //     const target = event.target;
    //     const name = target.name;

    //     this.setState(() => ({
    //         [name]: target.value
    //     }));
    // }

    render() {
        
        return (
            <div className="lists">
                <Paper className="container">
                    <Typography variant="display3" value={this.state.title} gutterBottom>
                    </Typography>
                    {this.createTable()}
                    <Divider />
                    <div className="nameField">
                        <TextField name="name" label="Name" fullWidth value={this.state.name} 
                            onChange={this.handleInputChange}
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

export default ManageLists;