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
      uid: "",
    };
    firebase.auth().onAuthStateChanged((user) => {
      console.log("CALLED");
      if (user) {
        
        this.setState({ uid: user.uid });
        const database = firebase.database();
        const ref = database.ref('users/' + user.uid);
        ref.once("value", (snapshot) => {
          // this.setState({ name: snapshot.val().name });
        });
      }
    });
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <AppConsumer>
      {({loggedIn}) =>
        loggedIn ?
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
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink><Link to={`/profile/${this.state.uid}`}>My profile</Link></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={() => firebase.auth().signOut()}>Logout</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
            {/* </div> */}
          </div>
        : <div name="navBar">
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Localists</NavbarBrand>
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
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link to={routes.LOGIN}>Login</Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        }
      </AppConsumer>
    );
  }
}
