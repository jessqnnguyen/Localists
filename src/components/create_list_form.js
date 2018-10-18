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
        address: "485 Crown St, Surry Hills, Sydney"
      }],
    };
  }

  handleInputChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
  }

  handlePlaceNameChange = (idx) => (event) => {
    const newPlaces = this.state.places.slice();
    newPlaces[idx].name = event.target.value;
    this.setState({ places: newPlaces });
  }

  handlePlaceAddressChange = (idx) => (event) => {
    const newPlaces = this.state.places.slice();
    newPlaces[idx].address = event.target.value;
    this.setState({
      places: newPlaces
    });
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleAddPlace = () => {
    this.setState({
      places: this.state.places.concat([{ name: '', address: '' }])
    });
  }

  handleRemovePlace = (idx) => () => {
    this.setState({
      places: this.state.places.filter((place, sidx) => idx !== sidx)
    });
  }

  handleSelectSuggest = (idx) => (geocodedPrediction, originalPrediction) => {
    const newPlaces = this.state.places.slice();
    newPlaces[idx].address = geocodedPrediction.formatted_address;
    this.setState({
      places: newPlaces
    });
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
    return (
      <AppConsumer>
        {({loggedIn}) =>
          loggedIn ?
            <div class="createListForm">
              <div class="createListHeading">
                <h1 class="display-4">Create a new list</h1>
              </div>
              <Form>
                <FormGroup id="titleField">
                  <Label for="nameField">Title</Label>
                  <Input type="name" name="name" id="name" placeholder={this.state.title} value={this.state.title} onChange={this.handleTitleChange}/>
                </FormGroup>
                {this.state.places.map((place, idx) => (
              <div class="placeGroup">
                    <div class="placeGroupHeader">
                      <div class="placeIndexName">
                        <p class="h5">Place {idx + 1}</p>
                      </div>
                      <div class="placeRemoveButton">
                        <Button outline color="danger" onClick={this.handleRemovePlace(idx)}>Remove</Button>
                      </div>
                    </div>
                    <FormGroup id="placeNameField">
                      <Label for="nameField">Place name</Label>
                      <Input type="name" name="name" id="name" placeholder={place.name} value={place.name} onChange={this.handlePlaceNameChange(idx)}/>
                    </FormGroup>
                    <FormGroup id="placeAddressField">
                      <Label for="nameField">Address</Label>
                      <GoogleMapLoader
                        params={{
                          key: 'AIzaSyCBnlJi4Ij4k4zmrzEgSGqP8ntZjOk4hZY',
                          libraries: "places,geocode",
                        }}
                        render={googleMaps => googleMaps && (
                          <GooglePlacesSuggest
                          googleMaps={googleMaps}
                          autocompletionRequest={{ input: place.address }}
                          onSelectSuggest={this.handleSelectSuggest(idx)}
                          textNoResults="No results"
                          customRender={prediction => (
                            <div className="customWrapper">{prediction ? prediction.description : "No results"}</div>
                          )}
                          >
                            <Input
                              type="text"
                              value={place.address}
                              onChange={this.handlePlaceAddressChange(idx)}
                            />
                          </GooglePlacesSuggest>
                        )
                        }
                        />
                    </FormGroup>
                  </div>
                ))}
                <div class="addPlaceButton">
                  <Button outline color="primary" size="sm" onClick={() => this.handleAddPlace()}>Add new place</Button>
                </div>
                <div class="saveChangesButton">
                  <Button color="primary" size="lg" onClick={() => this.saveList()}>Save changes</Button>
                </div>
              </Form>
            </div>
          : <LoginForm/>
        }
        </AppConsumer>
      );
  }
}

export default withRouter(CreateListForm);