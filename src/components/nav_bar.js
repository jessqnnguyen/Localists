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
require('firebase/auth')

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    routeChange() {
      this.props.history.push(routes.LOGIN);
    }

    render() {
      if (JSON.parse(sessionStorage.loggedIn) === true) {
        return (
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
                          <NavLink><Link to={routes.HOME}>My profile</Link></NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink onClick={() => firebase.auth().signOut()}>Logout</NavLink>
                      </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            {/* </div> */}
        </div>
        );
      } else {
        return (
          <div name="navBar">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Localists</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink><Link to={routes.HOME}>Home</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to={routes.HOME}>Discover</Link></NavLink>
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
        );
      }
      
    }
  }
