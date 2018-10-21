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
import "firebase/storage";
import FileUploader from "react-firebase-file-uploader";

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      name: '',
      email: '',
      avatarURL: '',
      password: '',
    };

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const database = firebase.database();
        console.log(user.uid)
        this.setState({ uid: user.uid });
        const ref = database.ref("users/" + user.uid);
        ref.once("value", (snapshot) => {
          if (snapshot.exists()) {
            const user = snapshot.val();
            this.setState({ name: user.name, email: user.email, avatarURL: user.avatar });
          }
        });
      }
    });
  }

  updatePassword(newPassword) {
    this.setState({ password: newPassword});
    
  }

  saveChanges() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Update user's name and email and avatar
        var db = firebase.database();
        db.ref('users/' + user.uid).set({
          name: this.state.name,
          email: this.state.email,
          avatar: this.state.avatarURL ? this.state.avatarURL : '',
        });

        // If the user has updated their password, the state should store the new password
        // Else if it is empty the user hasn't updated their password
        // if (this.state.password !== '') {
        //   console.log("the state's password is " + this.state.password);
        //   console.log("this ran but it shouldn't have");
          
        //   user.updatePassword(this.state.password).then(function() {
        //     // Update successful
        //     this.props.history.push(routes.HOME);
        //   }).catch(function(error) {
        //     throw new Error("Error: Password could not be updated");
        //   });
        // }
      }
      this.props.history.push(routes.HOME);
    });
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
 
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

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
                  <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={event => this.setState({ password: event.target.value })}/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Upload a profile picture</Label>
                  {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                  {this.state.avatarURL && <div class="editProfilePageImage"> <img src={this.state.avatarURL}/> </div>}
                  <div class="editProfileUploadImageButton">
                    <FileUploader
                      accept="image/*"
                      name="avatar"
                      filename={file => this.state.uid }
                      storageRef={firebase.storage().ref('images')}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                    />
                  </div>
                </FormGroup>
                <div class="editProfileSaveChangesButton">
                  <Button color="primary" size="lg" onClick={() => this.saveChanges()}>Save changes</Button>
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