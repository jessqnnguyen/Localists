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
      // user == null means that user has logged out --> only set loggedIn status to false
      if (user == null) {
        this.setState({ 
          loggedIn: false, 
        }); 
      } else {
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
