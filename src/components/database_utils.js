
import firebase from 'firebase/app';
require('firebase/auth')

export default class DatabaseUtils {
    isUserLoggedIn() {
        return firebase.auth().currentUser ? true : false;
    }
    
    getUserLists() {
      var user = firebase.auth().currentUser;
      var database = firebase.database();
      if (user) {
          return database.ref("lists/" + user.uid);
      } else {
          // This function should only be called if the user is logged in,
          // throw error if it is called without this condition.
          throw Error("getUserDatabase() failed - user not logged in");
      }
    }
}
