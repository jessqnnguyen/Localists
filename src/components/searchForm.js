import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  }
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

  updateResults(input) {
    // TODO: firebase call goes here, probably... placeholder results for now
    console.log("You searched for: " + input);
    
    const results = [
      {id: "0", title: "Animal cafes to check out in Tokyo", length: "10"},
      {id: "1", title: "Great brunch cafes in the city", length: "7"},
      {id: "2", title: "Best cafes in Paris", length: "3"}
    ];

    this.setState({
      results: results
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid item xs={12}>
          <Grid container justify="center">
            <TextField
              placeholder="Search users and places"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.input}
              onChange={(event) => {this.updateInput(event.target.value)}}
            />
            <Button onClick={() => {this.updateResults(this.state.input)}}> Search </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center">
            {this.state.results === null && <p> Loading results... </p>}
            {this.state.results && this.state.results.map (result => (
                <div key={result.id}>
                  <div> {result.id} </div>
                  <div> {result.title} </div>
                  <div> {result.length} </div>
                </div>
              ))
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(SearchForm);