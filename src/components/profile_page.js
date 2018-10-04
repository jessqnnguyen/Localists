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
    InputGroupAddon,
    ListGroupItem,
    ListGroup,
    ListGroupItemText,
    ListGroupItemHeading
} from 'reactstrap';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import '../styles/profile_page_styles.css';
require('firebase/auth')

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'Jessica Nguyen',
                email: 'jessqnnguyen@gmail.com'
            },
            lists: [
                { title: "Fav brunch places" }, 
                { title: "Best cafes in Paris" },
            ],
        };
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange () {
        window.location.reload();
        this.props.history.push(routes.HOME);
        
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState(() => ({
            [name]: target.value
        }));
    }

    createProfileIcon(owner) {
        if (owner == "Jessica Nguyen") {
            return (
                <div class="profileIcon">
                    <img class="listProfileIcon" src="https://puu.sh/BF4oC/0a21e57d9d.png" class="rounded-circle"/>
                </div>
            );
        } else {
            return (
                <div class="profileIcon">
                    <img class="listProfileIcon" src="https://puu.sh/BF4zA/2483e27981.png" class="rounded-circle"/>
                </div>
            );
        }
    }

    createProfileHeader() {
        return (<div class="listHeader">
            <ListGroup>
                <ListGroupItem active>
                    <div class="profileHeader">
                        <div class="profileSection">
                            {this.createProfileIcon("Jessica Nguyen")}
                            <div class="listOwnerName">
                                <ListGroupItemText>Jessica Nguyen</ListGroupItemText>
                            </div>
                        </div>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>);
    }

    createListsTable = () => {
        const lists = this.state.lists;
        let listElements = [];
        for (let i=0; i < lists.length; i++) {
            listElements.push(this.createListElement(lists[i].title));
        }
        return listElements;
    }

    createListElement(title) {
        return(
            <ListGroupItem>
            <ListGroupItemHeading>{title}</ListGroupItemHeading>
            <ListGroupItemText><a class="text-primary" href="#"><Link to={routes.LISTPAGE}>View</Link></a></ListGroupItemText>
        </ListGroupItem>
        );
    }

    render() {
      return (
          <div class="listPage">
            {this.createProfileHeader()}
            <div class="profileLists">
                <ListGroup>
                    {this.createListsTable()}
                </ListGroup>
            </div>
          </div>
      );
    }
}

export default withRouter(ProfilePage);