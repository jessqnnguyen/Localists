import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import ListCardContainer from './listCardContainer.js';
import '../styles/profile.css';

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
      userDetails: {},
      ownedLists: [],
      followedLists: [],
    }
  }

  async componentDidMount() {
    // TEMPORARY: testing passing userId to profile page
    const { match: {params} } = this.props;
    const userId = params.userId;
    console.log("userId of current profile page: " + userId);

    // TODO: like searchForm.js, this is where the firebase call will go - find the user details and the user's lists
    const placeholderUserDetails = {
      firstName: "Robert",
      lastName: "Ma",
      profileImage: "https://res.cloudinary.com/noctisvirtus/image/upload/q_auto/v1537694776/wholesome_man.jpg", 
      homeAddress: "Sydney, Australia",
      numFollowers: "3.2m",
    };
    const placeholderList = [
      {id: "0", title: "Animal cafes to check out in Tokyo", length: "10", owner: userId},
      {id: "1", title: "Great brunch cafes in the city", length: "7", owner: userId},
      {id: "2", title: "Best cafes in Paris", length: "3", owner: userId}
    ];

    this.setState({
      userDetails: placeholderUserDetails,
      ownedLists: placeholderList,
      followedLists: placeholderList,
    });
  }

  render() {
    // styling
    const {classes} = this.props;
    console.log(this.state.userDetails);
    // TEMPORARY: testing passing userId to profile page
    const { match: {params} } = this.props;
    const userId = params.userId;
    return (
      <Grid container justify="space-evenly" spacing={16}>
        {/* profile details */}
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={1}>
            <Grid container 
              direction="column" 
              justify="space-evenly" 
              alignItems="center"
            >
              <Grid item>
                <Avatar id="profile-avatar" src={this.state.userDetails.profileImage} />                  
              </Grid>
              <Grid item>
                <Typography variant="display1" align="center" color="secondary" gutterBottom>
                  {this.state.userDetails.firstName} {this.state.userDetails.lastName} ({userId})
                </Typography>
                <Typography align="center" variant="caption" gutterBottom>
                  {this.state.userDetails.homeAddress}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container justify="space-evenly">
                  <Grid item xs={6}>
                    <Button disabled>
                      {this.state.userDetails.numFollowers} followers
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button color="secondary">
                      Unfollow
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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
                <Typography variant="display1" align="center" gutterBottom>
                  {this.state.userDetails.firstName}&#39;s lists
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
                <Typography variant="display1" align="center" gutterBottom>
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