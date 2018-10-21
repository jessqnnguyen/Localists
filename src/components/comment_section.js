import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroupItem,
  ListGroup,
  ListGroupItemText,
  ListGroupItemHeading,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import firebase from 'firebase/app';
import { debug } from 'util';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import moment from 'moment';
import '../styles/list_page_styles.css';


class CommentSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      comments: [],
      comment: ''
    };
  }

  refreshList = () => {

    const db = firebase.database();
    const uid = this.props.uid
    const id = this.props.id

    const listPath = uid + '/' + id;
    db.ref('lists/' + listPath + '/comments').once('value', snapshot => {
      this.setState(prevState => ({
        comments: []
      }));
      snapshot.forEach(parentSnapshot => {
        this.setState(prevState => ({
          comments: [...prevState.comments, {
            contents: parentSnapshot.val().contents,
            name: parentSnapshot.val().name,
            time: parentSnapshot.val().time
          }]
        }))
      });
    });
  }

  async componentDidMount() {
    const db = firebase.database();
    const uid = this.props.uid
    const id = this.props.id

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.ref('users/' + user.uid).once('value', snapshot => {
          this.setState(() => ({
            userName: snapshot.val().name
          }));
        });
      }
    });

    this.refreshList();
  }

  addComment = () => {
    const db = firebase.database();
    const uid = this.props.uid
    const id = this.props.id

    const comment = {
      contents: this.state.comment,
      name: this.state.userName,
      time: moment().format('MMMM Do YYYY, h:mm a')
    };

    const listPath = uid + '/' + id;

    this.setState(() => ({
      comment: ''
    }));

    const listRef = db.ref('lists/' + listPath);
    listRef.once('value', snapshot => {
      listRef.child('comments').push(comment);
      this.refreshList();
    });
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  render() {
    return (
      <div>
        <h1 class="display-6">Comments</h1>
        {this.state.userName && 
        <Form>
          <FormGroup>
            <Label for="comment">New Comment</Label>
            <Input type="textarea" value={this.state.comment} name="text" name="comment" onChange={this.handleCommentChange} />
          </FormGroup>
          <Button onClick={this.addComment}>Post</Button>
        </Form>
        }
        <div class="listPageListItemsSection">
          <ListGroup>
            {this.state.comments.length ? this.state.comments.map(comment =>
              <Card className="commentCard">
                <CardBody>
                  <CardTitle>{comment.name}</CardTitle>
                  <CardText>{comment.contents}</CardText>
                  <CardText>
                    <small className="text-muted">{comment.time}</small>
                  </CardText>
                </CardBody>
              </Card>) : ''}
          </ListGroup>
        </div>
      </div>
    );
  }

}

export default CommentSection;