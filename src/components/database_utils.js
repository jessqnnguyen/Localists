
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

export function getUserAvatar(userId) {
    let avatarUrl = '';
    console.log("this called");
    firebase.database().ref("users/" + userId).once("value", snapshot => {
        console.log("this ref worked");
        if (snapshot.exists()) {
            console.log("this snapshot exists in the ref");
            const user = snapshot.val();
            avatarUrl = user.avatar;
            console.log('avatarUrl set to ' + avatarUrl);
        } else {
            console.log("no snapshot found for " + userId);
        }
    });
    return avatarUrl;
}