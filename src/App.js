import React, { Component } from 'react';
import './App.css';
import { AppProvider } from './AppContext';
// route-related
import {Route} from 'react-router-dom';
import * as routes from './constants/routes';
// our components
import Home from './components/home';
import Discover from './components/discover';
import NavBar from './components/navbar';
import LoginForm from './components/loginForm';
import Profile from './components/profile';
import ManageLists from './components/manageLists';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="page">
          <Route exact path={routes.HOME} component={Home}></Route>
          <Route exact path={routes.DISCOVER} component={Discover}></Route>
          <Route exact path={routes.LOGIN} component={LoginForm}></Route>
          <Route exact path={routes.MANAGELISTS} component={ManageLists}></Route>
          <Route exact path={routes.PROFILE + "/:userId"} component={props => <Profile {...props} />}></Route>
        </div>
      </div>
    );
  }
}

export default App;
