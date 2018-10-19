
import firebase from 'firebase/app';

export function getUserLists() {
    var user = firebase.auth().currentUser;
    if (user) {
        return firebase.database().ref("lists/" + user.uid);
    } else {
        // This function should only be called if the user is logged in,
        // throw error if it is called without this condition.
        throw Error("getUserDatabase() failed - user not logged in");
    }
}
