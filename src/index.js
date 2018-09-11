import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCSXmPP3cRZbnSN_DZ_hcCfQKrkBP2uUB4",
  authDomain: "list-66.firebaseapp.com",
  databaseURL: "https://list-66.firebaseio.com",
  projectId: "list-66",
  storageBucket: "list-66.appspot.com",
  messagingSenderId: "796897373754"
});
firebase.firestore().settings({timestampsInSnapshots: true});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
