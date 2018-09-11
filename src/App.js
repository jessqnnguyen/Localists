import React, { Component } from 'react';
import './App.css';
import { AppProvider } from './AppContext';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends Component {
  state = {
    openLogin: false,
    openSignUp: false,
  };

  render() {
    return (
      <div style={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton style={{marginLeft: -12, marginRight: 20}} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={{flexGrow: 1}}>
              Localist
            </Typography>
            <Button color="inherit" onClick={() => this.setState({ openLogin: true })}>Login</Button>
          </Toolbar>
        </AppBar>
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
            <Button onClick={() => this.setState({ openLogin: false, openSignUp: true })} color="primary">
              Don't have an account? Sign up
            </Button>
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

export default App;
