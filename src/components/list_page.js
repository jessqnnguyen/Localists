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
import '../styles/list_page_styles.css';
import { AppConsumer } from '../AppContext';
import firebase from 'firebase/app';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { getUserAvatar } from './database_utils';
import CommentSection from './comment_section';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    center={props.places[0] && props.places[0].location ? props.places[0].location: { lat: -34.397, lng: 150.644 }}
    position={props.places[0] && props.places[0].location ? props.places[0].location: { lat: -34.397, lng: 150.644 }}
  >
    {props.places.map(place => <Marker position={place.location} />)}
  </GoogleMap>
))

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.uid,
      avatarUrl: '',
      ownerName: "",
      list: {
        title: "", 
        places: [],
      }
    };
    let avatarUrl = '';
    const userId = this.state.userId;
    firebase.database().ref("users/" + userId).once("value", snapshot => {
        console.log("this ref worked");
        if (snapshot.exists()) {
            console.log("this snapshot exists in the ref");
            const user = snapshot.val();
            avatarUrl = user.avatar;
            this.setState({avatarUrl: avatarUrl});
            this.setState({ownerName: user.name});
            console.log('avatarUrl set to ' + avatarUrl);
        } else {
            console.log("no snapshot found for " + userId);
        }
    });
  }

  async componentDidMount(){
    const db = firebase.database();
    const uid = this.props.match.params.uid;
    const id = this.props.match.params.id

    // get user's name - copy pasted from profile_page
    // TODO: get profile image url once implemented
    const user_ref = db.ref("users/" + uid);
    user_ref.once("value", snapshot => {
      if (!snapshot.exists()) {
        throw "list_page.js: invalid user id";
      }
      const u = snapshot.val();
      console.log("list_page.js: u = " + JSON.stringify(u));
      this.setState({
        ownerName: u.name,
        avatarUrl: u.avatar
      });
    });

    // get list specified by url parameters
    const listPath = uid + '/' + id;
    db.ref('lists/' + listPath).once('value', snapshot => {
      this.setState({
        list: snapshot.val()
      });
    });
  }

  createProfileIcon() {
    return (
      <div class="profileIcon">
        <img class="listProfileIcon" src={this.state.avatarUrl ? this.state.avatarUrl : images.DEFAULTPROFILEICON } class="rounded-circle"/>
      </div>
    );
  
  }

  createFollow(uid, followedLists) {
    const listOwnerId = this.props.match.params.uid;
    const listId = this.props.match.params.id
    return (
      <Button color="success" onClick={() => {
        followedLists && followedLists[listId] 
          ? firebase.database().ref('users/' + uid + '/followedLists/' + listId).remove()
          : firebase.database().ref('users/' + uid + '/followedLists/' + listId).set({
              places: this.state.list.places,
              title: this.state.list.title,
              uid: listOwnerId,
            });
      }}>
        {followedLists && followedLists[listId] ? 'Unfollow' : 'Follow'}
      </Button>
    );
  }

  render() {
    const listPath = this.props.match.params.uid + '/' + this.props.match.params.id;
    const profilePath = '/profile/' + this.props.match.params.uid;
    return (
      <AppConsumer>
        {({uid, followedLists}) =>
          <div class="listPage">
            <div class="listHeader">
              <ListGroup>
                <ListGroupItem active>
                  <div class="listPageHeaderSection">
                    <div class="listPageProfileIconName">
                      {this.createProfileIcon()}
                      <div class="listOwnerName">
                        <ListGroupItemText><a onClick={() => this.props.history.push(profilePath)}>{this.state.ownerName}</a></ListGroupItemText>
                      </div>
                    </div>
                    <div class="listPageListTitle">
                      <ListGroupItemHeading>{this.state.list.title}</ListGroupItemHeading>
                    </div>
                    {this.props.match.params.uid == uid && 
                      <div class="listPageEditListButton">
                        <Button color="success" onClick={() => this.props.history.push(routes.EDITLIST + '/' + listPath)}>
                          Edit list
                        </Button>
                      </div>
                    }
                    {this.props.match.params.uid != uid &&
                      <div>
                        {this.createFollow(uid, followedLists)}
                      </div>
                    }
                  </div>
                </ListGroupItem>
              </ListGroup>
            </div>
            <div class="listPageListItemsSection">
              <ListGroup>
                {this.state.list.places.map(place =>
                <ListGroupItem>
                  <div class="listPageListItem">
                    <ListGroupItemHeading>{place.name}</ListGroupItemHeading>
                    <ListGroupItemText>{place.address}</ListGroupItemText>
                  </div>
                </ListGroupItem>)}
              </ListGroup>
            </div>
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBnlJi4Ij4k4zmrzEgSGqP8ntZjOk4hZY&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              places={this.state.list.places}
            />
            <br/>
            <CommentSection uid={this.props.match.params.uid} id={this.props.match.params.id} ownerName={this.state.ownerName}/>
          </div>
        }
      </AppConsumer>
    );
  }
}

export default withRouter(ListPage);