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
      results: []
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
    db.ref('users').on('value', snapshot => {

      var results = [];

      snapshot.forEach(function(childSnapshot) {
        const user = childSnapshot.val();
        if(user.name.includes(query) || user.email == (query))
          results.push(user);
      });
      console.log("results = " + results);

      this.setState(() => ({
        results: results
      }));
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  userItem (user) {
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
            </TabPane>
            <TabPane tabId="2">
              {this.state.results.map(r => this.userItem(r))}
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
    const { results, query, hasClickedSearch } = this.state;
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
        {results.length > 0 && this.renderResultTabs()}
        {results.length == 0 && hasClickedSearch && this.renderNoResultsFound()}
      </div>
    );
  }
}

export default withRouter(DiscoverPage);