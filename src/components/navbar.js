import React, {Component} from 'react';
// route-related
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openLogin: false,
      openSignUp: false,
      tabIndex: 0,
    };
  }

  render() {
    return (
      <div> 
        <Paper style={{flexGrow: 1}}>
          <Tabs
            value={this.state.tabIndex}
            onChange={(event, tabIndex) => {tabIndex < 2 && this.setState({ tabIndex })}}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Home" component={Link} to={routes.HOME} />
            <Tab label="Discover" component={Link} to={routes.DISCOVER} />
            <Tab label="Login" onClick={() => this.setState({openLogin: true})} />
            <Tab label="Sign Up" onClick={() => this.setState({openSignUp: true})} />
          </Tabs>
        </Paper>
        
        <br/>

        <Dialog
          open={this.state.openLogin}
          onClose={() => this.setState({ openLogin: false })}
          aria-labelledby="form-dialog-title" 
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              label="Password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ openLogin: false })} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.setState({ openLogin: false })} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openSignUp}
          onClose={() => this.setState({ openSignUp: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              label="Password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ openSignUp: false })} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.setState({ openSignUp: false })} color="primary">
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default NavBar;