import React, { Component } from 'react';
import './app.css';
import NavBar from './components/nav_bar';
import LoginForm from './components/login_form';
import Dashboard from './components/dashboard';
import RegisterForm from './components/register_form';
import DiscoverPage from './components/discover_page';
import CreateListForm from './components/create_list_form';
import ListPage from './components/list_page';
import ProfilePage from './components/profile_page';
// Route related
import {Switch, Route} from 'react-router-dom';
import * as routes from './constants/routes';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div class="content">
          <Switch>
            <Route exact  path={routes.HOME} component={Dashboard}></Route>
            <Route exact path={routes.LOGIN} component={LoginForm}></Route>
            <Route exact path={routes.REGISTER} component={RegisterForm}></Route>
            <Route exact path={routes.DISCOVER} component={DiscoverPage}></Route>
            <Route exact path={routes.CREATELIST} component={CreateListForm}></Route>
            <Route exact path={routes.LISTPAGE} component={ListPage}></Route>
            <Route exact path={routes.PROFILE} component={ProfilePage}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}
