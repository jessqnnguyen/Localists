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
import firebase from 'firebase/app';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {title: '', places: []}
    };
  }

  componentDidMount(){
    return firebase.database().ref('/lists/' + this.props.match.params.uid + '/' + this.props.match.params.id).once('value').then((snapshot) => {
      this.setState({list: snapshot.val()});
    });
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

  render() {
    return (
      <div class="listPage">
        <div class="listHeader">
          <ListGroup>
            <ListGroupItem active>
              <div class="listItem">
                <div class="listLeft">
                  <ListGroupItemHeading>{this.state.list.title}</ListGroupItemHeading>
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
        <ListGroup>
          {this.state.list.places.map(place =>
          <ListGroupItem>
            <ListGroupItemHeading>{place.name}</ListGroupItemHeading>
            <ListGroupItemText>{place.address}</ListGroupItemText>
          </ListGroupItem>)}
        </ListGroup>
      </div>
    );
  }
}

export default withRouter(ListPage);