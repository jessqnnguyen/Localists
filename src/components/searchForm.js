import React, {Component} from 'react';
// route-related
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import ListCardContainer from './listCardContainer.js';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
});

// TODO: two options - SearchForm contains both the search bar + search results (current)
// OR search bar and search results are two separate components, and pass
// the search input between siblings by using parent as intermediary
// https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
class SearchForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input: '',
      results: []
    }
  }

  updateInput(input) {
    this.setState({
      input: input
    });
  }

  updateResults() {
    // TODO: firebase call goes here, probably... placeholder results for now
    console.log("You searched for: " + this.state.input);
    
    const results = [
      {id: "0", title: "Animal cafes to check out in Tokyo", length: "10", owner: "userA"},
      {id: "1", title: "Great brunch cafes in the city", length: "7", owner: "userB"},
      {id: "2", title: "Best cafes in Paris", length: "3", owner: "userC"},
    ];

    this.setState({
      results: results
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={16}
      >
        {/* search form */}
        <Grid item>
          <Grid container justify="space-evenly">
            <TextField
              placeholder="Search users and places"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.input}
              onChange={(event) => {this.updateInput(event.target.value)}}
            />
            <Button onClick={() => {this.updateResults()}}> Search </Button>
          </Grid>
        </Grid>
        {/* search results */}
        <Grid item>
          {this.state.results === null && <p> Loading results... </p>}
          {this.state.results && <ListCardContainer lists={this.state.results} />}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchForm);