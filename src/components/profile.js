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

    // TODO: like searchForm.js, this is where the firebase calls will go - find the user details and the user's lists
    const placeholderUserDetails = {
      userId: userId,
      firstName: "Robert",
      lastName: "Ma",
      profileImage: "https://res.cloudinary.com/noctisvirtus/image/upload/q_auto/v1537694776/wholesome_man.jpg", 
      homeAddress: "Sydney, Australia",
      numFollowers: 3,
    };
    // this will be derived from searching the profile owner's list of followers
    const placeholderFollowed = "Follow";

    const placeholderList = [
      {id: "0", title: "Animal cafes to check out in Tokyo", length: "10", owner: userId},
      {id: "1", title: "Great brunch cafes in the city", length: "7", owner: userId},
      {id: "2", title: "Best cafes in Paris", length: "3", owner: userId}
    ];

    this.setState({
      userDetails: placeholderUserDetails,
      followed: placeholderFollowed,
      ownedLists: placeholderList,
      followedLists: placeholderList,
    });
  }
  
  // triggered by pressing "Follow" or "Unfollow" button
  // also removes/adds current user from profile owner's list of followers,
  updateFollowed() {
    console.log("followed before = " + this.state.followed);

    var newFollowed = "Follow";
    if (this.state.followed == "Follow") {
      newFollowed = "Unfollow";
    }

    this.setState({
      followed: newFollowed,
    });
  }

  render() {
    // styling
    const {classes} = this.props;
    console.log(this.state.userDetails);

    const { match: {params} } = this.props;
    const userId = params.userId;
    console.log("userId of current profile page: " + userId);

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
                  {this.state.userDetails.firstName} {this.state.userDetails.lastName} ({this.state.userDetails.userId})
                </Typography>
                <Typography align="center" variant="caption" gutterBottom>
                  {this.state.userDetails.homeAddress}
                </Typography>
                <Grid container justify="center">
                  <Grid item xs={7}>
                    <Button disabled>
                      {this.state.userDetails.numFollowers} followers
                    </Button>
                  </Grid>
                  {/* TODO: replace with separate component if necessary */}
                  <Grid item xs={5}>
                    {(this.state.userDetails.userId !== "default") && 
                      <Button color="secondary" onClick={() => {this.updateFollowed()}}>
                        {this.state.followed}
                      </Button>
                    }
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

// // follow/unfollow button depending on whether already following or not
// function FollowRow(props) {
//   // TODO: should make a firebase call to determine whether the logged in user is following the profile owner
//   // if on own profile page, only shows num followers
//   // if on followed profile page, shows Unfollow button
//   // if on non-followed profile page, shows Follow button
//   const currUser = props.userId;
//   const followed = true;

//   if (currUser == "default") {
//     return (
//       <Grid container justify="center">
//         <Grid item xs={12}>
//           <Button disabled>
//             {this.state.userDetails.numFollowers} followers
//           </Button>
//         </Grid>
//       </Grid>
//     );
//   } else if (followed) {
//     return (
//       <Grid container justify="center">
//         <Grid item xs={7}>
//           <Button disabled>
//             {this.state.userDetails.numFollowers} followers
//           </Button>
//         </Grid>
//         {/* TODO: replace with functional component when necessary */}
//         <Grid item xs={5}>
//           {(userId !== "default") && <Button color="secondary"> Unfollow </Button>}
//         </Grid>
//       </Grid>
//     );
//   }

// }

export default withStyles(styles)(Profile);