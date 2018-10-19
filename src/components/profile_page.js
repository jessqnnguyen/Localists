import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import {
  Button,
  ListGroupItem,
  ListGroup,
  ListGroupItemText,
  ListGroupItemHeading
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/profile_page_styles.css';
import { AppConsumer } from '../AppContext';
import firebase from 'firebase/app';


class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: props.match.params.name,
        email: props.match.params.name,
      },
      lists: [],
    };
    firebase.auth().onAuthStateChanged((user) => {
      const database = firebase.database();
        console.log(user.uid)
        const ref = database.ref("lists/" + user.uid);
        ref.once("value", (snapshot) => {
          var l = [];
          if (snapshot.exists()) {
            snapshot.forEach((listSnapshot) => {
              l.push({id:listSnapshot.key, title:listSnapshot.val().title, places:listSnapshot.val().places});
            });
            this.setState({ lists: l });
            console.log(this.state.lists, l);
          }
        });
    });
  }

  handleInputChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
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
    return (
      <div class="listHeader">
        <ListGroup>
          <ListGroupItem active>
            <div class="profileHeader">
              <div class="profileSection">
                {this.createProfileIcon("Jessica Nguyen")}
                <div class="listOwnerName">
                  <ListGroupItemText>{this.state.user.name}</ListGroupItemText>
                </div>
                <Button color="success" onClick={() => {}}>Edit profile</Button>
              </div>
            </div>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
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
          <div class="profileListsHeading">
            <h1 class="display-4">My lists</h1>
          </div>
          <ListGroup>
            {this.createListsTable()}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfilePage);