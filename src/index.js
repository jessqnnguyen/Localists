import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AppProvider } from './AppContext';
require('firebase/auth');
require('firebase/database');


firebase.initializeApp({
  apiKey: "AIzaSyCSXmPP3cRZbnSN_DZ_hcCfQKrkBP2uUB4",
  authDomain: "list-66.firebaseapp.com",
  databaseURL: "https://list-66.firebaseio.com",
  projectId: "list-66",
  storageBucket: "list-66.appspot.com",
  messagingSenderId: "796897373754"
});
firebase.firestore().settings({timestampsInSnapshots: true});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

ReactDOM.render(
  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>
  ,
	document.getElementById('root')
);
registerServiceWorker();
