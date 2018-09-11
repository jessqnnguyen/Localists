import React, { Component } from 'react';
import './App.css';
import { AppProvider } from './AppContext';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class App extends Component {
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
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default App;
