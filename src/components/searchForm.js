import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  }
});

class SearchForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input: ''
    }
  }

  updateInput(input) {
    this.setState({
      input: input
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <TextField
        placeholder="Search users and places"
        type="search"
        className={classes.textField}
        margin="normal"
        value={this.state.input}
        onChange={(event) => {this.updateInput(event.target.value)}}
      />
    );
  }
}


export default withStyles(styles)(SearchForm);