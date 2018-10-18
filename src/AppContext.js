import React from 'react';
import firebase from 'firebase/app';

const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
    firebase.auth().onAuthStateChanged((user) => this.setState({ loggedIn: user ? true : false }));
  }

  render() {

    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>
  }
}
export const AppConsumer = AppContext.Consumer;
