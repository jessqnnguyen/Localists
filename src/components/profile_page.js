import React, { Component } from 'react';
import * as routes from '../constants/routes';
import * as images from '../constants/images';
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
import LoginForm from './login_form';
import firebase from 'firebase/app';


class ProfilePage extends Component {
  constructor(props) {
    super(props);
  
    // set profile state
    this.state = {
      user: {
        uid: props.match.params.uid,
        name: "",
        avatarUrl: '',
      },
      lists: [],
    };
    let avatarUrl = '';
    const userId = props.match.params.uid;
    firebase.database().ref("users/" + userId).once("value", snapshot => {
        console.log("this ref worked");
        if (snapshot.exists()) {
            console.log("this snapshot exists in the ref");
            const user = snapshot.val();
            avatarUrl = user.avatar;
            this.state = {
              avatarUrl: avatarUrl,
            };
            console.log('avatarUrl set to ' + this.state.avatarUrl);
        } else {
            console.log("no snapshot found for " + userId);
        }
    });
  }

  async componentDidMount() {
    // get user's name based on id
    const db = firebase.database();
    const user_ref = db.ref("users/" + this.state.user.uid);
    user_ref.once("value", snapshot => {
      if (!snapshot.exists()) {
        throw "profile_page.js: invalid user id";
      }
      const u = snapshot.val();
      console.log("profile_page.js: u = " + JSON.stringify(u));
      console.log("avatar url in componentDidMount() " + u.avatar);
      this.setState({
        user: {
          name: u.name,
          avatarUrl: u.avatar
        }
      });
    });
    // get user's lists
    const lists_ref = db.ref("lists/" + this.state.user.uid);
    lists_ref.once("value", (snapshot) => {
      var l = [];
      if (snapshot.exists()) {
        snapshot.forEach((listSnapshot) => {
          l.push({id:listSnapshot.key, title:listSnapshot.val().title, places:listSnapshot.val().places});
        });
        this.setState({
          lists: l
        });
      }
    });
  }

  handleInputChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
  }

  createProfileIcon() {
    const avatarUrl = this.state.user.avatarUrl;
    console.log("avatarUrl in createProfileIcon call" + avatarUrl);
    return (
      <div class="profileIcon">
        <img class="listProfileIcon" src={ avatarUrl ? avatarUrl : images.DEFAULTPROFILEICON } class="rounded-circle"/>
      </div>
    );
  }

  createProfileHeader() {
    return (
      <div class="listHeader">
        <ListGroup>
          <ListGroupItem active>
            <div class="profileHeader">
              <div class="profileSection">
                {this.createProfileIcon()}
                <div class="listOwnerName">
                  <ListGroupItemText>{this.state.user.name}</ListGroupItemText>
                </div>
                <Button color="success" onClick={() => this.props.history.push(routes.EDITPROFILE)}>Edit profile</Button>
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