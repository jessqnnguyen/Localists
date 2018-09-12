import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
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

  async componentDidMount() {
    // TODO: firebase call goes here, probably...
    const results = [];
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
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center">
            <p> search results go here </p>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(SearchForm);