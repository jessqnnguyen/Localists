import '../index.css';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase/app';
require('firebase/auth')


class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: ""
        }
    }

    render() {
        return (
            <Paper className="container">
                <Typography variant="display4" gutterBottom>
                    Helloooo
                </Typography>
            </Paper>
        );
    }

}

export default Welcome;