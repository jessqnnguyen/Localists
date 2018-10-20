import React, { Component } from 'react';
import * as routes from '../constants/routes';
import {
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Jumbotron,
  Container,
} from 'reactstrap';
import '../styles/dashboard_styles.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import LoginForm from './login_form';
import ListIcon from './list.svg';
import { AppConsumer } from '../AppContext';
import loadingSpinner from '../images/svg-loaders/grid.svg';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists:[],
      followedLists:[],

      loading:true
    }

    console.log(this.state.lists);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const database = firebase.database();
        console.log(user.uid)
        const ref = database.ref("lists/" + user.uid);
        ref.once("value", (snapshot) => {
          var l = [];
          if (snapshot.exists()) {
            snapshot.forEach((listSnapshot) => {
              l.push({id:listSnapshot.key, title:listSnapshot.val().title, places:listSnapshot.val().places});
            });
            this.setState({ lists: l, loading: false});
            // console.log(this.state.lists, l);
          } else {
            // No lists found, loading done, set loading to false
            this.setState({ loading: false });
          }
        });
      }
    });
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

  renderUserLists() {
    return this.state.lists.map(list => <AppConsumer>
      {({uid}) =>
        <ListGroupItem>
          <div class="listElement">
            <ListGroupItemHeading id="dashboardListTitle">{list.title}</ListGroupItemHeading>
            <div class="dashboardListFooter">
              <ListGroupItemText id="dashboardListViewLink">
                <a class="text-primary"><Link to={routes.LISTPAGE + '/' + uid + '/' + list.id}>View</Link></a>
              </ListGroupItemText>
              <Button color="success" onClick={() => {}}>Edit list</Button>
            </div>
          </div>
        </ListGroupItem>
      }
      </AppConsumer>)
  }

  renderNoListsMessage() {
    return (<Jumbotron>
      <Container>
        <h1>You have no lists yet :(</h1>
        <p className="lead">Click 'Create new list' to create your first list now</p>
      </Container>
    </Jumbotron>);
  }

  renderLoadingSpinner() {
    return (
      <div class="loadingSpinner">
        <img src={loadingSpinner} class="mx-auto" alt="Loading"/>
      </div>
    );
  }

  render() {
    return (
      <AppConsumer>
        {({loggedIn}) =>
          loggedIn ? <div class="dashboard">
            <div class="lists">
              <div class="listsHeader">
                <div class="listHeaderHeading">
                  <img id="listsHeaderIcon" src={ListIcon}/>
                  <h1>Your lists</h1>
                </div>
                <div class="addListButton">
                  <Button outline color="primary" size="lg" onClick={() => this.props.history.push(routes.CREATELIST)}>
                    Create new list
                  </Button>
                </div>
              </div>
              {this.state.loading 
                ? this.renderLoadingSpinner() 
                : this.state.lists.length == 0 
                    ? <div class="noListsMessage">{this.renderNoListsMessage()}</div>
                    : <ListGroup> {this.renderUserLists()} </ListGroup>
              }
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
        : <LoginForm/>
    }
    </AppConsumer>
    );
  }
}

export default withRouter(Dashboard);