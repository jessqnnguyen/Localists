import React from 'react';
import firebase from 'firebase/app';

const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      uid: ''
    }
    firebase.auth().onAuthStateChanged(user => {
      console.log("CALLED");
      console.log(JSON.stringify(user));
      // user has been logged out, so user == null --> only set loggedIn status to false
      if (user == null) {
        console.log("CAUGHT ERROR, user = " + JSON.stringify(user));
        this.setState({ 
          loggedIn: false, 
        }); 
      } else {
        console.log("what, user = " + JSON.stringify(user));
        this.setState({ 
          loggedIn: true, 
          uid: user.uid
        });
      }
    });
  }

  render() {

    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>
  }
}
export const AppConsumer = AppContext.Consumer;
