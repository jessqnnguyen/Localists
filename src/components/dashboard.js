import React, { Component } from 'react';
import * as routes from '../constants/routes';
import {
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import '../styles/dashboard_styles.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import LoginForm from './login_form';
import ListIcon from './list.svg';
require('firebase/auth')

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.state = {
      lists:[],
      followedLists:[]
    }

    console.log(this.state.lists);
    firebase.auth().onAuthStateChanged((user) => {
      const database = firebase.database();
      if (user) {
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
      }
    });
  }

  routeChange () {
    window.location.reload();
    this.props.history.push(routes.CREATELIST);    
  }

  createListsTable = () => {
    console.log(this.state.lists);
    let listElements = [];
    for (let i=0; i < this.state.lists.length; i++) {
      console.log(this.state.lists[i].title);

      listElements.push(this.createListElement(this.state.lists[i].title));
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
      listElements.push(this.createFollowingListElement(title, owner));
    }
    return listElements;
  }

  createFollowingListElement(title, owner) {
    return (
      <ListGroupItem>
        <div class="listItem">
          <div class="listLeft">
            <ListGroupItemHeading>{title}</ListGroupItemHeading>
            <ListGroupItemText>
              <a class="text-primary" href="#"><Link to={routes.LISTPAGE}>View</Link></a>
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

  createListElement(title) {
    return (
      <ListGroupItem>
        <div class="listElement">
          <ListGroupItemHeading id="dashboardListTitle">{title}</ListGroupItemHeading>
          <div class="dashboardListFooter">
            <ListGroupItemText id="dashboardListViewLink">
              <a class="text-primary" href="#"><Link to={routes.LISTPAGE}>View</Link></a>
            </ListGroupItemText>
            <Button color="success" onClick={() => this.routeChange()}>Edit list</Button>
          </div>
        </div>
      </ListGroupItem>
    );
  }

  render() {
    if (JSON.parse(sessionStorage.loggedIn) === true) {
      return (
        <div class="dashboard">
          <div class="lists">
            <div class="listsHeader">
              <div class="listHeaderHeading">
                <img id="listsHeaderIcon" src={ListIcon}/>
                <h1>Your lists</h1>
              </div>
              <div class="addListButton">
                <Button outline color="primary" size="lg" onClick={() => this.routeChange()}>
                  Create new list
                </Button>
              </div>
            </div>
            <ListGroup>
              {this.createListsTable()}
            </ListGroup>
          </div>
          <div class="followingLists">
            <div class="followingListsHeader">
              <img id="listsHeaderIcon" src={ListIcon}/>
              <div class="followinglistsHeading"><h1>Lists you're following</h1></div> 
            </div> 
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

export default withRouter(Dashboard);