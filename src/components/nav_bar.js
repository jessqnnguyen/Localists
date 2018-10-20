import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import firebase from 'firebase/app';
import '../styles/nav_bar_styles.css';
import { getUserLists } from './database_utils';
import { AppConsumer } from '../AppContext';


export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      lists: [],
    };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderLogin(loggedIn, uid) {
    return (
      loggedIn ?
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink><Link to={`/profile/${uid}`}>My profile</Link></NavLink>
          </NavItem>
          <NavItem>
            <NavLink><Link onClick={() => firebase.auth().signOut()} to={routes.HOME}>Logout</Link></NavLink>
          </NavItem>
        </Nav>
      :
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link to={routes.LOGIN}>Login</Link>
          </NavItem>
        </Nav>  
    );
  }

  render() {
    return (
      <AppConsumer>
      {({loggedIn, uid}) =>
        <div name="navBar">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Localists</NavbarBrand>
            {/* <NavbarBrand href="/"><img src="https://puu.sh/BFnVJ/ad76812c7b.png"/></NavbarBrand> */}
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink><Link to={routes.HOME}>Home</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to={routes.DISCOVER}>Discover</Link></NavLink>
                </NavItem>
              </Nav>
              {this.renderLogin(loggedIn, uid)}
            </Collapse>
          </Navbar>
        </div>
      }
      </AppConsumer>
    );
  }
}
