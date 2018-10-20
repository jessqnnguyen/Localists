import React from 'react';
import firebase from 'firebase/app';

const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: sessionStorage.getItem('uid'),
      followedUsers: {}
    }

    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
      uid: user ? user.uid : undefined,
    }, () => sessionStorage.setItem('uid', user ? user.uid : undefined))});

    firebase.database().ref("users/" + this.state.uid).on("value", snapshot => {
      this.setState({ followedUsers: snapshot.val() && snapshot.val().followedUsers });
    });
  }

  render() {

    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>
  }
}
export const AppConsumer = AppContext.Consumer;
