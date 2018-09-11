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
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class App extends Component {
  state = {
    openLogin: false,
    openSignUp: false,
    value: 0,
  };

  render() {
    return (
      <div style={{flexGrow: 1}}>
        <Paper style={{flexGrow: 1}}>
          <Tabs
            value={this.state.value}
            onChange={(event, value) => {value < 2 && this.setState({ value })}}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Home" />
            <Tab label="Discover" />
            <Tab label="Login" onClick={() => this.setState({openLogin: true})}/>
            <Tab label="Sign Up" onClick={() => this.setState({openSignUp: true})} />
          </Tabs>
        </Paper>
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

export default App;
