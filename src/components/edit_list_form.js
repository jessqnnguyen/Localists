import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getUserLists } from './database_utils';
import '../styles/edit_list_form_styles.css';
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest"
import { AppConsumer } from '../AppContext';
import LoginForm from './login_form';
import firebase from 'firebase/app';
import { List } from './create_list_form';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    center={props.places[0].location}
    position={props.places[0].location}
  >
    {props.places.map(place => <Marker position={place.location} />)}
  </GoogleMap>
));

class EditListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      title: '',
      titleError: '',
      places: [{

      }],
      modalOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    return firebase.database().ref('/lists/' + this.props.match.params.uid + '/' + this.props.match.params.id).once('value').then((snapshot) => {
      const list = snapshot.val();
      this.setState({
        list: list,
        title: list ? list.title : "",
        places: list ? list.places : []
      });
    });
  }

  // TODO(chris): Save this list to the firebase database.
  saveList() {
    if (!this.state.title) {
      this.setState({
        titleError: "Please enter a valid title"
      });
      return;
    }

    // Stuff to send to the database.
    const { title, places } = this.state;
    var list = new List(title, places);
    list.id = this.props.match.params.id;
    list.save();
    this.props.history.push(routes.HOME)
  }

  deleteList() {
    firebase.database().ref('/lists/' + this.props.match.params.uid + '/' + this.props.match.params.id).remove().then(() => {
      this.props.history.push(routes.HOME)
    })
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  renderModal() {
    return (
      <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Warning</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this list? This cannot be undone.
          </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => this.deleteList()}>Delete</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }

  render() {
    return (
      <AppConsumer>
        {({ uid }) =>
          uid ?
            <div class="editListForm">
              <div class="editListFormHeading">
                <h1 class="display-4">Edit your list</h1>
                <div class="editListFormDeleteListButton">
                  <Button outline color="danger" size="sm" onClick={() => this.toggle()}>Delete List</Button>
                </div>
                {this.renderModal()}
              </div>
              <Form>
                <FormGroup id="titleField">
                  <Label for="nameField">Title</Label>
                  <Input type="name" name="name" id="name" placeholder={this.state.title} value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                  <span style={{ color: "red" }}>{this.state.titleError}</span>
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
                            onSelectSuggest={(geocodedPrediction, originalPrediction) => this.setState({
                              places: [
                                ...this.state.places.slice(0, index),
                                { ...this.state.places[index], name: originalPrediction.description, address: geocodedPrediction.formatted_address, googlePlacesId: geocodedPrediction.place_id },
                                ...this.state.places.slice(index + 1)
                              ]
                            })}
                            textNoResults="No results"
                            customRender={prediction => (
                              <div className="customWrapper">{prediction ? prediction.description : "No results"}</div>
                            )}
                          >
                            <Input type="name" name="name" placeholder={place.name} value={place.name} onChange={(event) =>
                              this.setState({
                                places: [
                                  ...this.state.places.slice(0, index),
                                  { ...this.state.places[index], name: event.target.value },
                                  ...this.state.places.slice(index + 1)
                                ]
                              })
                            } />
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
                          this.setState({
                            places: [
                              ...this.state.places.slice(0, index),
                              { ...this.state.places[index], address: event.target.value },
                              ...this.state.places.slice(index + 1)
                            ]
                          })
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
                <div class="createListMap">
                  <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBnlJi4Ij4k4zmrzEgSGqP8ntZjOk4hZY&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, width: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    places={this.state.places}
                  />
                </div>
              </Form>
            </div>
            : <LoginForm />
        }
      </AppConsumer>
    );
  }
}

export default withRouter(EditListForm);