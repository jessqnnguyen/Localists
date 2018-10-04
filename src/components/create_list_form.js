import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import '../styles/create_list_form_styles.css';
require('firebase/auth')

// Just for reference. JS doesn't handle types.
export class List {
    title; // Title of the list - string.
    places; // List of places - Place[].
}

// Just for reference. JS doesn't handle types.
export class Place {
    name; // Name of place - string.
    address; // Address of place - string.
}

class CreateListForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Fav brunch places',
            places: [{name: "Four Ate Five", address: "485 Crown St, Surry Hills, Sydney"}],
        };
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange () {
        window.location.reload();
        this.props.history.push(routes.HOME);
        
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState(() => ({
            [name]: target.value
        }));
    }

    handlePlaceNameChange = (idx) => (event) => {
        const newPlaces = this.state.places.slice();
        newPlaces[idx].name = event.target.value;
        this.setState({ places: newPlaces });
    }

    handlePlaceAddressChange = (idx) => (event) => {
        const newPlaces = this.state.places.slice();
        newPlaces[idx].address = event.target.value;
        this.setState({ places: newPlaces });
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleAddPlace = () => {
        this.setState({
          places: this.state.places.concat([{ name: '', address: ''}])
        });
    }

    handleRemovePlace = (idx) => () => {
        this.setState({ places: this.state.places.filter((place, sidx) => idx !== sidx) });
    }

    // TODO(chris): Save this list to the firebase database.
    saveList() {
        // Stuff to send to the database.
        const list = this.state.list;
        const title = list.title;
        const places = list.places;
        // TODO: Add firebase functions here.
    }

    render() {
      return (
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
                            <Input type="name" name="name" id="name" placeholder={place.address} value={place.address} onChange={this.handlePlaceAddressChange(idx)}/>
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
      );
    }
}

export default withRouter(CreateListForm);