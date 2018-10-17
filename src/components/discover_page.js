import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Nav,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  CardLink,
  NavItem,
  NavLink,
  Input,
  Button,
  Alert,
  InputGroup,
  TabContent,
  TabPane,
  InputGroupAddon,
  Pagination, 
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import firebase from 'firebase/app';
import '../styles/discover_page_styles.css';
import classnames from 'classnames';
require('firebase/auth')


class DiscoverPage extends Component {

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);

    this.state = {
      query: "",
      /* Whether the user has clicked the search button yet */
      hasClickedSearch: false, 
      resultsPerPage: 8,
      currentPage: 1,
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
    const query = this.state.query.toLowerCase();
    this.state.hasClickedSearch = true;
    const db = firebase.database();
    var listResults = [];
    var userResults = [];

    // Populate list search results.
    db.ref('lists').on('value', snapshot => {
      snapshot.forEach(function(childSnapshot) {
        childSnapshot.forEach(function(childSnapshot) {
          const list = childSnapshot.val();
          if (list.places != null) {
            for (let place of list.places) {
              // Add list if one of its places has an address that contains the query
              const address = place.address.toLowerCase();
              if (address.includes(query) || address == (query)) {
                listResults.push(list);
                break;
              }
            }
          }
        });
      });
      this.setState(() => ({
        listResults: listResults,
      }));
    });
    console.log("listResults = " + JSON.stringify(listResults));

    // Populate user search results. 
    db.ref('users').on('value', snapshot => {
      snapshot.forEach(function(childSnapshot) {
        const user = childSnapshot.val();
        const name = user.name ? user.name.toLowerCase() : "";
        if (name.includes(query) || name == (query)) {
          userResults.push(user);
        }
      });
      this.setState(() => ({
        userResults: userResults,
      }));
    });
    console.log("userResults = " + JSON.stringify(userResults));

    // reset current results page
    this.setState({
      currentPage: 1
    });
    this.toggle('1');
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        currentPage: 1
      });
    }
  }

  userItem(user) {
    return (
      <Card class="card">
        <CardBody>
          <CardTitle>{user.name || "No name! (shouldn't happen)"}</CardTitle>
          <CardSubtitle>{user.email}</CardSubtitle>
          {/* TODO: Store user's location in db and display here or delete this subtitle. */}
          <CardText>Insert user location here</CardText>
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
          {/* TODO: Store a description field in the list table on the db or display here and delete this subtitle. */}
          <CardSubtitle>List subtitle if exists</CardSubtitle>
          <CardLink href="#">View</CardLink>
        </CardBody>
      </Card>
    );
  }

  renderResultTabs() {
    const { currentPage, resultsPerPage, listResults, userResults } = this.state;
    // find index of first and last result to render based on page number
    // NOTE: for now, tabs do not track what page you were on (toggle() resets currentPage to 1)
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;

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
            {listResults.length > 0 && listResults.slice(indexOfFirstResult, indexOfLastResult).map(r => this.listItem(r))}
            {listResults.length == 0 && this.renderNoResultsFound()}
            {this.renderPagination("Lists")}
          </TabPane>
          <TabPane tabId="2">
            {userResults.length > 0 && userResults.slice(indexOfFirstResult, indexOfLastResult).map(r => this.userItem(r))}
            {userResults.length == 0 && this.renderNoResultsFound()}
            {this.renderPagination("Users")}
          </TabPane>
        </TabContent>
      </div>
    );
  }
  
  renderNoResultsFound() {
    return <div class="noResultsFoundAlert">
      <Alert color="danger">No results found!</Alert>
    </div>;
  }
  
  // based on: https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
  renderPagination(resultsTab) {
    const { resultsPerPage, listResults, userResults } = this.state;
    // result length depends on which tab is active
    var resultsLength;
    if (resultsTab == "Lists") {
      resultsLength = listResults.length;
    } else if (resultsTab == "Users") {
      resultsLength = userResults.length;
    }
    // determine how many pages there should be based on result length
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(resultsLength / resultsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <Pagination>
        {pageNumbers.map(number => (
          <PaginationItem>
            <PaginationLink
              key={number}
              id={number}
              onClick={this.handlePageChange}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    );
  }

  handlePageChange = (event) => {
    this.setState({
      currentPage: event.target.id
    });
  }

  render() {
    const { query, hasClickedSearch } = this.state;
    console.log("query: " + query);
    return (
      <div class="discoverPage">
        <h1 class="display-4">Discover</h1>
        <Form>
          <div class="searchBar">
            <div class="searchInput">
              <InputGroup>
                <Input name="query" id="exampleEmail" placeholder="Search users and places" onChange={this.handleInputChange}/>
                <InputGroupAddon addonType="append">
                  <Button outline color="primary" onClick={() => this.search()}>Search</Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </Form>
        {hasClickedSearch && this.renderResultTabs()}
      </div>
    );
  }
}

export default withRouter(DiscoverPage);