import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {
  Form,
  FormGroup,
  Label,
  Nav,
  Row,
  Card,CardBody,CardSubtitle,CardText,CardTitle,CardLink,
  NavItem,
  NavLink,
  Input,
  Button,
  TabContent,
  TabPane,
  Alert,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import '../styles/discover_page_styles.css';
require('firebase/auth')


class DiscoverPage extends Component {

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);

    this.state = {
      query: "",
      /* Whether the user has clicked the search button yet */
      hasClickedSearch: false, 
      listResults: [],
      userResults: [],
    };
  }

  routeChange () {
    window.location.reload();
    this.props.history.push(routes.HOME); 
  }

  register = () => {
    this.routeChange("register");
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;

    this.setState(() => ({
      [name]: target.value
    }));
  }

  search = () => {
    const query = this.state.query;
    this.state.hasClickedSearch = true;
    const db = firebase.database();
    // TODO: add results for Lists as well
    var listResults = [];
    var userResults = [];

    // populate list search
    db.ref('lists').on('value', snapshot => {
      snapshot.forEach(function(childSnapshot) {
        childSnapshot.forEach(function(childSnapshot) {
          const list = childSnapshot.val();
          for (let place of list.places) {
            // UNTESTED: add list if one of its places has an address that contains the query
            console.log("place address: " + place.address + "\nplace name: " + place.name);
            if (place.address.includes(query) || place.address== (query)) {
              listResults.push(list);
              break;
            }
          }
        });
      });
      this.setState(() => ({
        listResults: listResults,
      }));
    });
    console.log("listResults = " + JSON.stringify(listResults));

    // populate user search
    db.ref('users').on('value', snapshot => {
      snapshot.forEach(function(childSnapshot) {
        const user = childSnapshot.val();
        if (user.name.includes(query) || user.email == (query)) {
          userResults.push(user);
        }
      });
      this.setState(() => ({
        userResults: userResults,
      }));
    });
    console.log("userResults = " + JSON.stringify(userResults));
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  userItem(user) {
    return (
      <Card class="card">
        <CardBody>
          <CardTitle>{user.name}</CardTitle>
          <CardSubtitle>{user.email}</CardSubtitle>
          <CardText>Some info about the user?</CardText>
          <CardLink href="#">Follow</CardLink>
          <CardLink href="#">View</CardLink>
        </CardBody>
      </Card>
    );
  }

  listItem(list) {
    return (
      <Card class="card">
        <CardBody>
          <CardTitle>{list.title}</CardTitle>
          <CardSubtitle>insert subtitle?</CardSubtitle>
          <CardLink href="#">View</CardLink>
        </CardBody>
      </Card>
    );
  }

  renderResultTabs() {
    this.state.hasClickedSearch = false;
    return (
      <div class="searchResults">
        <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}>
                Lists
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}>
                Users
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              {/* TODO: Fill this in with search results from the List table. */}
              {this.state.listResults.map(r => this.listItem(r))}
            </TabPane>
            <TabPane tabId="2">
              {this.state.userResults.map(r => this.userItem(r))}
            </TabPane>
          </TabContent>
        </div>
    );
  }
  
  renderNoResultsFound() {
    this.state.hasClickedSearch = false;
    return <Alert color="danger">No results found!</Alert>
  }

  render() {
    const { userResults, listResults, query, hasClickedSearch } = this.state;
    console.log("query: " + query);
    return (
      <div class="discoverPage">
        <h1 class="display-4">Discover</h1>
        <Form>
          <div class="searchBar">
            <div class="searchInput">
              <FormGroup>
                <InputGroup>
                  <Input name="query" id="exampleEmail" placeholder="Search users and places" onChange={this.handleInputChange}/>
                  <InputGroupAddon addonType="append"><Button outline color="primary" onClick={() => this.search()}>Search</Button></InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>
          </div>
        </Form>
        {userResults.length > 0 && listResults.length > 0 && this.renderResultTabs()}
        {userResults.length == 0 && listResults.length > 0 && hasClickedSearch && this.renderNoResultsFound()}
      </div>
    );
  }
}

export default withRouter(DiscoverPage);