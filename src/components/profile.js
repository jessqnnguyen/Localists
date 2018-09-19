import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';


class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match: {params} } = this.props;
    const userId = params.userId;
    console.log("userId of current profile page: " + userId);
    return (
      <Grid container style={{ flexGrow: 1 }} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
            <p> PLACEHOLDER: you're on {userId}'s profile page </p>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Profile;