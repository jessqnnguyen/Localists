import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import '../styles/discover_page_styles.css';
require('firebase/auth')

class DiscoverPage extends Component {

    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange () {
        window.location.reload();
        this.props.history.push(routes.HOME);
        
    }

    register = () => {
        this.routeChange("register");
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
        <div class="discoverPage">
            <h1 class="display-4">Discover</h1>
            <Form>
                <div class="searchBar">
                    <div class="searchInput">
                        <FormGroup>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Search users and places" />
                        </FormGroup>
                    </div>
                    <div class="searchButton">
                        <Button outline color="primary">Search</Button>
                    </div>
                </div>
            </Form>
        </div>
      );
    }
}

export default withRouter(DiscoverPage);