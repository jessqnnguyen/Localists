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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

class App extends Component {
  state = {
    openLogin: false,
    openSignUp: false,
    tabIndex: 0,
  };

  render() {
    return (
      <div style={{flexGrow: 1}}>
        <Paper style={{flexGrow: 1}}>
          <Tabs
            value={this.state.tabIndex}
            onChange={(event, tabIndex) => {tabIndex < 2 && this.setState({ tabIndex })}}
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
        <Grid container style={{flexGrow: 1}} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
                <Grid key={value} item>
                  <Card style={{maxWidth: 345}}>
                    <CardMedia
                      style={{height: 0, paddingTop: '56.25%'}}
                      image="https://www.incimages.com/uploaded_files/image/970x450/getty_855098134_353411.jpg"
                      title="Blah"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                        Blah
                      </Typography>
                      <Typography component="p">
                        Some text
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View List
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
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
