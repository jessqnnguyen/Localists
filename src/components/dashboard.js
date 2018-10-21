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
import { List } from './create_list_form';
import { getUserAvatar } from './database_utils';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists:[],
      followedLists: this.props.followedLists,
      userUid: this.props.uid,
      avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/list-66.appspot.com/o/images%2FHsEUxwCJYSMeHf010LSPXiPDKJt2.png?alt=media&token=7c0b5758-d8c4-43b6-a5f0-33d80ba87ec3',
      avatarUrls: {},
      loading:true
    }

    console.log(this.state.lists);
    firebase.auth().onAuthStateChanged((user) => {
      console.log("onauthchanged");
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
        this.setState({ userUid: user.uid });
        firebase.database().ref("users/" + user.uid).on("value", snapshot => {
          if (snapshot.val()) {
            console.log("checking user table now..");
            this.setState({ followedLists: snapshot.val().followedLists });
            console.log(snapshot.val());
            this.cacheProfileIcons();
          }
        });
        console.log("cache profile icons");
      }
    });
  }

  cacheProfileIcons() {
    const followedLists = this.state.followedLists;
    if (!followedLists) {
      console.log("followedlists is null");
    }
    for (var key in followedLists) {
      console.log("enter for loop " + key);
      const list = followedLists[key];
      console.log("list " + list);
      let userId = list.userId;
      firebase.database().ref("users/" + userId).once("value", snapshot => {
        console.log("this ref worked");
        if (snapshot.exists()) {
            console.log("this snapshot exists in the ref");
            const user = snapshot.val();
            const avatarUrl = user.avatar;
            this.setState({ avatarUrl: avatarUrl });
            let newAvatarUrls = this.state.avatarUrls;
            newAvatarUrls[userId] = avatarUrl;
            this.setState({ avatarUrls: newAvatarUrls });
            console.log('avatarUrl set to ' + avatarUrl);
        } else {
            console.log("no snapshot found for " + userId);
        }
      });
    } 
  }

  createProfileIcon(userId) {
    return (
      <div class="profileIcon">
        <img class="listProfileIcon" src={this.state.avatarUrls[userId]} class="rounded-circle"/>
      </div>
    );
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
              <Button color="success" onClick={() => this.props.history.push(routes.EDITLIST + '/' + uid + '/' + list.id)}>Edit list</Button> 
            </div>
          </div>
        </ListGroupItem>
      }
      </AppConsumer>);
  }

  renderNoListsMessage() {
    return (<Jumbotron>
      <Container>
        <h1>You have no lists yet :(</h1>
        <p className="lead">Click 'Create new list' to create your first list</p>
      </Container>
    </Jumbotron>);
  }

  renderNoFollowingListsMessage() {
    return (<Jumbotron>
      <Container>
        <h1>You're not following any lists yet :(</h1>
        <p className="lead">Click 'Discover' to find new lists to follow</p>
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

  renderFollowingLists() {
    const { followedLists } = this.state.followedLists;
    if (!followedLists) {
      console.log("thisran");
    }
    return (<ListGroup>
      {followedLists && Object.keys(followedLists).map(list =>
        <ListGroupItem>
          <div class="listItem">
            <div class="listLeft">
              <ListGroupItemHeading>{followedLists[list].title}</ListGroupItemHeading>
              <ListGroupItemText>
                <a class="text-primary"><Link to={routes.LISTPAGE + '/' + followedLists[list].uid + '/' + list}>View</Link></a>
              </ListGroupItemText>
            </div>
            <div class="listRight">
              {this.createProfileIcon(list.userId)}
              <div class="listOwnerName">
                <ListGroupItemText>{"Jessica Nguyen"}</ListGroupItemText>
              </div>
            </div>
          </div>
        </ListGroupItem>
      )}
    </ListGroup>);
  }

  render() {
    const { followedLists } = this.state;
    return (
      <AppConsumer>
        {({uid, followedLists}) =>
          uid ? 
            <div class="dashboard">
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
                { this.state.loading
                  ? this.renderLoadingSpinner()
                  : !followedLists || followedLists.length == 0
                      ? <div class="noListsMessage">{this.renderNoFollowingListsMessage()}</div>
                      :  
                      <ListGroup>
                          {followedLists && Object.keys(followedLists).map(list =>
                            <ListGroupItem>
                              <div class="listItem">
                                <div class="listLeft">
                                  <ListGroupItemHeading>{followedLists[list].title}</ListGroupItemHeading>
                                  <ListGroupItemText>
                                    <a class="text-primary"><Link to={routes.LISTPAGE + '/' + followedLists[list].uid + '/' + list}>View</Link></a>
                                  </ListGroupItemText>
                                </div>
                                <div class="listRight">
                                  {this.createProfileIcon(followedLists[list].userId)}
                                  <div class="listOwnerName">
                                    <ListGroupItemText>{"Jessica Nguyen"}</ListGroupItemText>
                                  </div>
                                </div>
                              </div>
                            </ListGroupItem>
                          )}
                    </ListGroup> 
                }
              </div>
          </div>
        : <LoginForm/>
      }
    </AppConsumer>
    );
  }
}

export default withRouter(Dashboard);