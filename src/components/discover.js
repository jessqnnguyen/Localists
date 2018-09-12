import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  }
});

// for now, discover is a functional component
function Discover(props) {
  const {classes} = props;
  return (
    <div> 
      <Grid item xs={12}>
        <Grid container justify="center">
          <Typography variant="display4">
            Discover
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center">
          <TextField
            placeholder="Search users and places"
            type="search"
            className={classes.textField}
            margin="normal"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Discover);