import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import ListCardContainer from './listCardContainer.js';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownedLists: [],
      followedLists: [],
    }
  }

  async componentDidMount() {
    // TODO: like searchForm.js, this is where the firebase call will go - same placeholder list as searchForm.js for now

    const placeholder = [
      {id: "0", title: "Animal cafes to check out in Tokyo", length: "10", owner: "userA"},
      {id: "1", title: "Great brunch cafes in the city", length: "7", owner: "userB"},
      {id: "2", title: "Best cafes in Paris", length: "3", owner: "userC"}
    ];

    this.setState({
      ownedLists: placeholder,
      followedLists: placeholder,
    });
  }

  render() {
    // styling
    const {classes} = this.props;
    // TEMPORARY: testing passing userId to profile page
    const { match: {params} } = this.props;
    const userId = params.userId;
    console.log("userId of current profile page: " + userId);
    
    return (
      <Grid container justify="space-evenly" spacing={16}>
        {/* profile details */}
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="headline" align="center" component="h3">
              PLACEHOLDER: you&#39;re on {userId}&#39;s profile page
            </Typography>
          </Paper>
        </Grid>
        {/* owned lists */}
        <Grid item xs={6}>
            <Grid container 
              direction="column" 
              justify="space-evenly" 
              alignItems="center" 
              spacing={8}
            >
              <Paper className={classes.paper} elevation={1}>
                <Grid item>
                  <Typography variant="headline" align="center" component="h3">
                    {userId}&#39;s lists
                  </Typography>
                </Grid>
                <Grid item>
                  <ListCardContainer lists={this.state.ownedLists} />
                </Grid>
              </Paper>
            </Grid>
        </Grid>
        {/* followed lists */}
        <Grid item xs={6}>
            <Grid container 
              direction="column" 
              justify="space-evenly" 
              alignItems="center" 
              spacing={8}
            >
              <Paper className={classes.paper} elevation={1}>
                <Grid item>
                  <Typography variant="headline" align="center" component="h3">
                    Following
                  </Typography>
                </Grid>
                <Grid item>
                  <ListCardContainer lists={this.state.followedLists} />
                </Grid>
              </Paper>
            </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Profile);