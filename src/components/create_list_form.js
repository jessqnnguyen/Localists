import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import { getUserLists } from './database_utils';
import '../styles/create_list_form_styles.css';
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest"
import { AppConsumer } from '../AppContext';
import LoginForm from './login_form';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    center={props.places[0].location}
    position={props.places[0].location}
  >
    {props.places.map(place => <Marker position={place.location} />)}
  </GoogleMap>
))

export class List {
  constructor(title, places) {
    this.id = "";
    // Title of the list - string.
    this.title = title;
    // List of places - Place[].
    this.places = places;
  }

  // not tested yet
  load(id) {
    if (id !== "") {
      var userLists = getUserLists();
      userLists.child(this.id).once("value", function(snapshot) {
        if (snapshot.exists()) {
          this.id = snapshot.val.id;
          this.title = snapshot.val.title;
          this.places = snapshot.val.places;
        }
        userLists.child(this.id).set({
          title: this.title,
          places: this.places,
        });
      });
    }
  }

  save() {
    var userLists = getUserLists();
    // If the list has already been loaded i.e. if the list id is non-empty
    if (this.id !== "") {
      userLists.child(this.id).once("value", function(snapshot) {
        if (!snapshot.exists()) {
          this.id = this.ref.push().key;
        }
        this.ref.child(this.id).set({
          title: this.title,
          places: this.places,
        });
      });
    } else {
      // The list is new so set the list id to the id returned
      // by the database push.
      this.id = userLists.push().key;
      userLists.child(this.id).set({
        title: this.title,
        places: this.places,
      });
    }
  }
}

// Just for reference. JS doesn't handle types.
// export class Place {
//   constructor (name, address) {
//     this.name = name;
//     this.address = address;
//   }
// }


class CreateListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {  },
      title: 'Fav brunch places',
      places: [{
        name: "Four Ate Five",
        address: "485 Crown St, Surry Hills, Sydney",
        location: {lat: -33.8881246, lng: 151.2132603}
      }],
    };
  }

  // TODO(chris): Save this list to the firebase database.
  saveList() {
    // Stuff to send to the database.
    const {title, places} = this.state;
    var list = new List(title, places);
    list.save();
    this.props.history.push(routes.HOME)
  }

  render() {
    console.log(this.state.places[0].location)
    return (
      <AppConsumer>
        {({uid}) =>
          uid ?
            <div class="createListForm">
              <div class="createListHeading">
                <h1 class="display-4">Create a new list</h1>
              </div>
              <Form>
                <FormGroup id="titleField">
                  <Label for="nameField">Title</Label>
                  <Input type="name" name="name" id="name" placeholder={this.state.title} value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })}/>
                </FormGroup>
                {this.state.places.map((place, index) => (
                  <div key={index} class="placeGroup">
                    <div class="placeGroupHeader">
                      <div class="placeIndexName">
                        <p class="h5">Place {index + 1}</p>
                      </div>
                      <div class="placeRemoveButton">
                        <Button outline color="danger" onClick={() => this.setState({ places: this.state.places.filter((place, sidx) => index !== sidx) })}>Remove</Button>
                      </div>
                    </div>
                    <FormGroup id="placeNameField">
                      <Label for="nameField">Place name</Label>
                      <GoogleMapLoader
                        params={{
                          key: 'AIzaSyCBnlJi4Ij4k4zmrzEgSGqP8ntZjOk4hZY',
                          libraries: "places,geocode",
                        }}
                        render={googleMaps => googleMaps && (
                          <GooglePlacesSuggest
                          googleMaps={googleMaps}
                          autocompletionRequest={{ input: place.name }}
                          onSelectSuggest={(geocodedPrediction, originalPrediction) => {
                            this.setState({ places: [
                              ...this.state.places.slice(0, index),
                              {
                                ...this.state.places[index],
                                name: originalPrediction.description,
                                address: geocodedPrediction.formatted_address,
                                location: {
                                  lat: geocodedPrediction.geometry.location.lat(),
                                  lng: geocodedPrediction.geometry.location.lng()
                                },
                                googlePlacesId: geocodedPrediction.place_id
                              },
                              ...this.state.places.slice(index + 1)
                            ]})
                          }}
                          textNoResults="No results"
                          customRender={prediction => (
                            <div className="customWrapper">{prediction ? prediction.description : "No results"}</div>
                          )}
                          >
                        <Input type="name" name="name" placeholder={place.name} value={place.name} onChange={(event) =>
                          this.setState({ places: [
                            ...this.state.places.slice(0, index),
                            { ...this.state.places[index], name: event.target.value },
                            ...this.state.places.slice(index + 1)
                          ]})
                        }/>
                        </GooglePlacesSuggest>
                      )}
                    />
                    </FormGroup>
                    <FormGroup id="placeAddressField">
                      <Label for="nameField">Address</Label>
                      <Input
                        type="text"
                        value={place.address}
                        onChange={(event) =>
                          this.setState({ places: [
                            ...this.state.places.slice(0, index),
                            { ...this.state.places[index], address: event.target.value },
                            ...this.state.places.slice(index + 1)
                          ]})
                        }
                      />
                    </FormGroup>
                  </div>
                ))}
                <div class="addPlaceButton">
                  <Button outline color="primary" size="sm" onClick={() => this.setState({ places: this.state.places.concat([{ name: '', address: '' }]) })}>Add new place</Button>
                </div>
                <div class="saveChangesButton">
                  <Button color="primary" size="lg" onClick={() => this.saveList()}>Save changes</Button>
                </div>
              </Form>
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBnlJi4Ij4k4zmrzEgSGqP8ntZjOk4hZY&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                places={this.state.places}
              />
            </div>
          : <LoginForm/>
        }
        </AppConsumer>
      );
  }
}

export default withRouter(CreateListForm);