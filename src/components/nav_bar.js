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
require('firebase/auth')

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    
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
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                <NavLink href=""><a component={Link} to={routes.HOME}>Home</a></NavLink>
                </NavItem>
                <NavItem>
                <NavLink href=""><a component={Link} to={routes.HOME}>Discover</a></NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                  <NavItem>
                      <NavLink href="/components/">My profile</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink onClick={() => firebase.auth().signOut()}>Logout</NavLink>
                  </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
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
                  <NavLink href=""><a component={Link} to={routes.HOME}>Home</a></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href=""><a component={Link} to={routes.HOME}>Discover</a></NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                  <NavItem>
                      <NavLink href=""><a component={Link} to={routes.LOGIN}>Login</a></NavLink>
                  </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        );
      }
      
    }
  }
