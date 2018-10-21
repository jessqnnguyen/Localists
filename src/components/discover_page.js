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
import { AppConsumer } from '../AppContext';
import { Link } from 'react-router-dom';
import loadingSpinner from '../images/svg-loaders/grid.svg';


class DiscoverPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      /* Whether the user has clicked the search button yet */
      hasClickedSearch: false,
      resultsPerPage: 8,
      currentPage: 1,
      loading: true,
      listResults: [],
      userResults: [],
    };
  }

  handleInputChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
  }

  search = () => {
    const query = this.state.query.toLowerCase();
    // initiating a search should reset loading and has clicked search status to true
    this.setState({
      hasClickedSearch: true,
      loading: true,
    })
    const db = firebase.database();
    var listResults = [];
    var userResults = [];

    // Populate list search results.
    db.ref('lists').on('value', snapshot => {
      snapshot.forEach(function(parentSnapshot) {
        parentSnapshot.forEach(function(childSnapshot) {
          // each list in listResult will have: id, uid, and uname
          let list = childSnapshot.val();
          list.id = childSnapshot.key;
          list.uid = parentSnapshot.key;
          // TEMP: testing - exclude lists from users that are not in users database
          // more of a problem with our database, but this is a temporary fix
          db.ref("users/" + list.uid).once("value", snapshot => {
            if (snapshot.exists()) {
              list.uname = snapshot.val().name;
              const listTitle = list.title.toLowerCase();
              if (listTitle.includes(query) || listTitle === query) {
                listResults.push(list);
                return;
              }
              if (list.places != null) {
                for (let place of list.places) {
                  // Add list if one of its places has an address that contains the query
                  const name = place.name.toLowerCase();
                  if (name.includes(query) || name == query) {
                    listResults.push(list);
                    return;
                  }
                  const address = place.address.toLowerCase();
                  if (address.includes(query) || address == (query)) {
                    listResults.push(list);
                    return;
                  }
                }
              }
            }
          });
        });
      });
      this.setState(() => ({
        listResults: listResults,
        loading: false,
      }));
    });
    console.log("listResults = " + JSON.stringify(listResults));

    // Populate user search results.
    db.ref('users').on('value', snapshot => {
      snapshot.forEach(function(childSnapshot) {
        let user = childSnapshot.val();
        user.uid = childSnapshot.key;
        const name = user.name ? user.name.toLowerCase() : "";
        if (name.includes(query) || name == (query)) {
          userResults.push(user);
        }
      });
      this.setState(() => ({
        userResults: userResults,
        loading: false,
      }));
    });
    console.log("userResults = " + JSON.stringify(userResults));

    // reset current results page, loading has finished
    this.setState({
      currentPage: 1,
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
      <AppConsumer>
        {({uid, followedUsers}) =>
          <Card class="card">
            <CardBody>
              <CardTitle>{user.name || "No name! (shouldn't happen)"}</CardTitle>
              <CardSubtitle>{user.email}</CardSubtitle>
              {/* TODO: Store user's location in db and display here or delete this subtitle. */}
              <CardText>Insert user location here</CardText>
              <CardLink onClick={() => {
                followedUsers && followedUsers[user.uid] ? firebase.database().ref('users/' + uid + '/followedUsers/' + user.uid).remove()
                  : firebase.database().ref('users/' + uid + '/followedUsers/' + user.uid).set({
                  email: user.email,
                });
              }}>{followedUsers && followedUsers[user.uid] ? 'Unfollow' : 'Follow'}</CardLink>
              <CardLink><Link to={routes.PROFILE + '/' + user.uid}>View</Link></CardLink>
            </CardBody>
          </Card>
        }
      </AppConsumer>
    );
  }

  listItem(list) {
    return (
      <AppConsumer>
        {({uid, followedLists}) =>
          <Card class="card">
            <CardBody>
              <CardTitle>{list.title}</CardTitle>
              <CardSubtitle>by {list.uname} AKA {list.uid} </CardSubtitle>
              <CardLink onClick={() => {
                followedLists && followedLists[list.id] ? firebase.database().ref('users/' + uid + '/followedLists/' + list.id).remove()
                  : firebase.database().ref('users/' + uid + '/followedLists/' + list.id).set({
                  places: list.places, title: list.title, uid: list.uid
                });
              }}>{followedLists && followedLists[list.id] ? 'Unfollow' : 'Follow'}</CardLink>
              <CardLink href="#"><Link to={routes.LISTPAGE + '/' + list.uid + '/' + list.id}>View</Link></CardLink>
            </CardBody>
          </Card>
        }
      </AppConsumer>
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
            {this.state.loading
              ? <Alert type="info">Loading...</Alert>
              : listResults.length == 0
                ? this.renderNoResultsFound()
                : listResults.slice(indexOfFirstResult, indexOfLastResult).map(list => this.listItem(list))
            }
            {this.renderPagination("Lists")}
          </TabPane>
          <TabPane tabId="2">
            {this.state.loading
              ? <Alert type="info">Loading...</Alert>
              : userResults.length == 0
                ? this.renderNoResultsFound()
                : userResults.slice(indexOfFirstResult, indexOfLastResult).map(user => this.userItem(user))
            }
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
                <Input name="query" id="exampleEmail" placeholder="Search users and places" onChange={event => this.setState({ query: event.target.value })}/>
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