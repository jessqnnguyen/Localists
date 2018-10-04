import React, { Component } from 'react';
import * as routes from '../constants/routes';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from 'reactstrap';
import '../styles/dashboard_styles.css';
import firebase from 'firebase/app';
import LoginForm from './login_form';
import RegisterForm from './register_form';
require('firebase/auth')

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    createListsTable = () => {
        const tempList = [
            {id: "0", title: "Animal cafes to check out in Tokyo", length: "10"},
            {id: "1", title: "Great brunch cafes in the city", length: "7"},
            {id: "2", title: "Best cafes in Paris", length: "3"}
        ];
        let listElements = [];
        for (let i=0; i < tempList.length; i++) {
            listElements.push(this.createListElement(tempList[i].title, i));
        }
        return listElements;
    }

    createFollowingListsTable = () => {
        const tempList = [
            {id: "0", title: "Fav ramen places in Sydney", length: "10", owner: "Jessica Nguyen"},
            {id: "1", title: "Good jazz bars", length: "7", owner: "Nick Balnaves"},
            {id: "2", title: "Best camping grounds", length: "3", owner: "Nick Balnaves"}
        ];
        let listElements = [];
        for (let i=0; i < tempList.length; i++) {
            const title = tempList[i].title;
            const owner = tempList[i].owner;
            listElements.push(this.createFollowingListElement(title, i, owner));
        }
        return listElements;
    }

    createFollowingListElement(title, index, owner) {
        if (index == 0) {
            return (
                <ListGroupItem>
                    <div class="listItem">
                        <div class="listLeft">
                            <ListGroupItemHeading>{title}</ListGroupItemHeading>
                            <ListGroupItemText>
                                <a class="text-primary" href="#">View</a>
                            </ListGroupItemText>
                        </div>
                        <div class="listRight">
                            {this.createProfileIcon(owner)}
                            <div class="listOwnerName">
                                <ListGroupItemText>{owner}</ListGroupItemText>
                            </div>
                        </div>
                    </div>
                </ListGroupItem>
            
            );
        } else {
            return(
            <ListGroupItem>
                <div class="listItem">
                    <div class="listLeft">
                        <ListGroupItemHeading>{title}</ListGroupItemHeading>
                        <ListGroupItemText>
                            <a class="text-primary" href="#">View</a>
                        </ListGroupItemText>
                    </div>
                    <div class="listRight">
                        {this.createProfileIcon(owner)}
                        <div class="listOwnerName">
                                <ListGroupItemText>{owner}</ListGroupItemText>
                        </div>
                    </div>
                </div>
            </ListGroupItem>);
        }
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

    createListElement(title, index) {
        if (index == 0) {
            return (<ListGroupItem>
                <ListGroupItemHeading>{title}</ListGroupItemHeading>
                <ListGroupItemText>
                    <a class="text-primary" href="#">View</a>
                </ListGroupItemText>
            </ListGroupItem>
            );
        } else {
            return(
            <ListGroupItem>
                <ListGroupItemHeading>{title}</ListGroupItemHeading>
                <ListGroupItemText>
                    <a class="text-primary" href="#">View</a>
                </ListGroupItemText>
            </ListGroupItem>);
        }
    }

    render() {
        if (JSON.parse(sessionStorage.loggedIn) === true) {
            return (
                <div class="dashboard">
                    <div class="lists">
                        <div class="listsHeader">
                            <div class="listHeading"><h1>Your lists</h1></div>
                            <div class="addListButton"><Button color="primary" size="lg">Create new list</Button></div>
                        </div>
                            <ListGroup>
                                {this.createListsTable()}
                            </ListGroup>
                    </div>
                    <div class="followingLists">
                        <div class="listsHeading"><h1>Following</h1></div>  
                        <ListGroup>
                            {this.createFollowingListsTable()}
                        </ListGroup>
                    </div>
                </div>
            );
        } else {
            return (
                <LoginForm/>
            );
        }
    }
}