import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import { getUserLists } from './database_utils';
import '../styles/edit_profile_form_styles.css';
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest"
import { AppConsumer } from '../AppContext';
import LoginForm from './login_form';
import firebase from 'firebase/app';

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      profileIcon: '',
    };

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const database = firebase.database();
        console.log(user.uid)
        const ref = database.ref("users/" + user.uid);
        ref.once("value", (snapshot) => {
          if (snapshot.exists()) {
            const user = snapshot.val();
            this.setState({ name: user.name, email: user.email });
          }
          // var l = [];
          // if (snapshot.exists()) {
          //   snapshot.forEach((listSnapshot) => {
          //     l.push({id:listSnapshot.key, title:listSnapshot.val().title, places:listSnapshot.val().places});
          //   });
          //   this.setState({ lists: l, loading: false});
          //   // console.log(this.state.lists, l);
          // } else {
          //   // No lists found, loading done, set loading to false
          //   this.setState({ loading: false });
          // }
        });
      }
    });
  }

  render() {
    return (
      <AppConsumer>
        {({uid}) =>
          uid ?
            <div class="editProfileForm">
              <div class="editProfileFormHeading">
                <h1 class="display-4">Edit profile</h1>
              </div>
              <Form>
                <FormGroup id="editProfileNameField">
                  <Label for="nameField">Name</Label>
                  <Input type="name" name="name" id="name" placeholder={this.state.name} value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}/>
                </FormGroup>
                <FormGroup id="editProfileEmailField">
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder={this.state.email} value={this.state.email} onChange={event => this.setState({ email: event.target.value })}/>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Change password</Label>
                  <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Upload a profile picture</Label>
                  <Input type="file" name="file" id="exampleFile" />
                  <FormText color="muted">
                    Please upload a square image.
                  </FormText>
                </FormGroup>
                <div class="editProfileSaveChangesButton">
                  <Button color="primary" size="lg" onClick={() => console.log('blah')}>Save changes</Button>
                </div>
              </Form>
            </div>
          : <LoginForm/>
        }
        </AppConsumer>
      );
  }
}

export default withRouter(EditProfileForm);