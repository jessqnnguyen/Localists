import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';
import {
  Button,
  ListGroupItem,
  ListGroup,
  ListGroupItemText,
  ListGroupItemHeading
} from 'reactstrap';
import '../styles/list_page_styles.css';
import { AppConsumer } from '../AppContext';


class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Fav brunch places',
      places: [
        {name: "Four Ate Five", address: "485 Crown St, Surry Hills NSW 2010"},
        {name: "Devon Cafe", address: "76 Devonshire St, Surry Hills NSW 2010"},
        {name: "Grandma's at McEvoy", address: "140-142 McEvoy St, Alexandria NSW 2015"},
      ],
    };
  }

  createProfileIcon(owner) {
    if (owner == "Jessica Nguyen") {
      return (
        <div class="profileIcon">
          <img class="listProfileIcon" src="https://puu.sh/BF4oC/0a21e57d9d.png" class="rounded-circle"/>
        </div>
      );
    } else {
      return (
        <div class="profileIcon">
          <img class="listProfileIcon" src="https://puu.sh/BF4zA/2483e27981.png" class="rounded-circle"/>
        </div>
      );
    }
  }

  createListHeader() {
    return (
      <div class="listHeader">
        <ListGroup>
          <ListGroupItem active>
            <div class="listItem">
              <div class="listLeft">
                <ListGroupItemHeading>Fav brunch places in the city</ListGroupItemHeading>
                <ListGroupItemText>
                  <Button color="success" onClick={() => this.props.history.push(routes.HOME)}>Edit list</Button>
                </ListGroupItemText>
              </div>
              <div class="listRight">
                {this.createProfileIcon("Jessica Nguyen")}
                <div class="listOwnerName">
                  <ListGroupItemText>Jessica Nguyen</ListGroupItemText>
                </div>
              </div>
            </div>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }

  createListsTable = () => {
    const places = this.state.places;
    let listElements = [];
    for (let i=0; i < places.length; i++) {
      listElements.push(this.createListElement(places[i].name, places[i].address));
    }
    return listElements;
  }

  createListElement(name, address) {
    return(
      <ListGroupItem>
        <ListGroupItemHeading>{name}</ListGroupItemHeading>
        <ListGroupItemText>{address}</ListGroupItemText>
      </ListGroupItem>
    );
  }

  render() {
    return (
      <div class="listPage">
        {this.createListHeader()}
        <ListGroup>
          {this.createListsTable()}
        </ListGroup>
      </div>
    );
  }
}

export default withRouter(ListPage);