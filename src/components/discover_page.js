import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Nav,
  Card,CardBody,CardSubtitle,CardText,CardTitle,CardLink,
  NavItem,
  NavLink,
  Input,
  Button,
  Alert,
  InputGroup,
  TabContent,
  TabPane,
  InputGroupAddon
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

		// Populates list search results.
		// TODO(robert): Delete these comments when done. 
    // "lists" collection structure:
    // user id
    //  - list id
    //    - "title"
    //    - "places": array
    //      - "address"
    //      - "name"
    db.ref('lists').on('value', snapshot => {
      snapshot.forEach(function(childSnapshot) {
        childSnapshot.forEach(function(childSnapshot) {
          const list = childSnapshot.val();
          for (let place of list.places) {
						// TODO(robert): Verify if this works.
            // Add list if one of its places has an address that contains the query
            console.log("place address: " + place.address + "\nplace name: " + place.name);
            const address = place.address.toLowerCase();
            if (address.includes(query) || address == (query)) {
              console.log("added list: title = " + list.title);
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
    console.log("called renderResultTabs");
    const { listResults, userResults } = this.state;
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
              {listResults.length > 0 && listResults.map(r => this.listItem(r))}
              {listResults.length == 0 && this.renderNoResultsFound()}
            </TabPane>
            <TabPane tabId="2">
              {userResults.length > 0 && userResults.map(r => this.userItem(r))}
              {userResults.length == 0 && this.renderNoResultsFound()}
            </TabPane>
          </TabContent>
        </div>
    );
  }
  
  renderNoResultsFound() {
    return <Alert color="danger">No results found!</Alert>
  }

  render() {
    const { query, hasClickedSearch } = this.state;
    console.log("query: " + query);
    console.log("hasClickedSearch: " + hasClickedSearch);
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