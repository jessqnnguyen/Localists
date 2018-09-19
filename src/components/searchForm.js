import React, {Component} from 'react';
// route-related
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  card: {
    maxWidth: 450,
  },
  media: {
    height: 140
  }
});

// TODO: two options - SearchForm contains both the search bar + search results (current)
// OR search bar and search results are two separate components, and pass
// the search input between siblings by using parent as intermediary
// https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
class SearchForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input: '',
      results: []
    }
  }

  updateInput(input) {
    this.setState({
      input: input
    });
  }

  updateResults(input) {
    // TODO: firebase call goes here, probably... placeholder results for now
    console.log("You searched for: " + input);
    
    const results = [
      {id: "0", title: "Animal cafes to check out in Tokyo", length: "10", author: "userA"},
      {id: "1", title: "Great brunch cafes in the city", length: "7", author: "userB"},
      {id: "2", title: "Best cafes in Paris", length: "3", author: "userC"}
    ];

    this.setState({
      results: results
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div style={{ padding: 10 }}>
        {/* search form */}
        <Grid item xs={12}>
          <Grid container justify="center">
            <TextField
              placeholder="Search users and places"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.input}
              onChange={(event) => {this.updateInput(event.target.value)}}
            />
            <Button onClick={() => {this.updateResults(this.state.input)}}> Search </Button>
          </Grid>
        </Grid>
        {/* search results */}
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
            {this.state.results === null && <p> Loading results... </p>}
            {this.state.results && this.state.results.map (result => (
                <Grid key={result.id} xs={12} item>
                  <Card className={classes.card}>
                    <CardActionArea>
                      {/* TODO: CardMedia should go here if we want an image for each list */}
                      <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                          {result.title}
                        </Typography>
                        <Typography component="p">
                          by <Link to={routes.PROFILE+"/"+result.author}> {result.author} </Link>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="secondary">
                        View list ({result.length} items)
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SearchForm);