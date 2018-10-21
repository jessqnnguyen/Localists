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
import '../styles/list_page_styles.css';
import { AppConsumer } from '../AppContext';
import firebase from 'firebase/app';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

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
      list: {title: '', places: []}
    };
  }

  componentDidMount(){
    return firebase.database().ref('/lists/' + this.props.match.params.uid + '/' + this.props.match.params.id).once('value').then((snapshot) => {
      this.setState({list: snapshot.val()});
    });
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

  render() {
    return (
      <div class="listPage">
        <div class="listHeader">
          <ListGroup>
            <ListGroupItem active>
              <div class="listPageHeaderSection">
                <div class="listPageProfileIconName">
                  {this.createProfileIcon("Jessica Nguyen")}
                  <div class="listOwnerName">
                    <ListGroupItemText>Jessica Nguyen</ListGroupItemText>
                  </div>
                </div>
                <div class="listPageListTitle">
                  <ListGroupItemHeading>{this.state.list.title}</ListGroupItemHeading>
                </div>
                <div class="listPageEditListButton">
                  <Button color="success" onClick={() => this.props.history.push(routes.EDITLIST + '/' + this.props.match.params.uid + '/' + this.props.match.params.id)}>Edit list</Button>
                </div>
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
      </div>
    );
  }
}

export default withRouter(ListPage);