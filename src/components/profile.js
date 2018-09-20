import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import ListCard from './listCard.js';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // styling
    const {classes} = this.props;
    // TEMPORARY: testing passing userId to profile page
    const { match: {params} } = this.props;
    const userId = params.userId;
    console.log("userId of current profile page: " + userId);
    
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="headline" component="h3">
                PLACEHOLDER: you're on {userId}'s profile page
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="headline" component="h3">
                {userId}'s lists
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="headline" component="h3">
                Following
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);