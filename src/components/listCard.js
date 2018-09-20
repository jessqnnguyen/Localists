import React, {Component} from 'react';
// route-related
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
// material-ui components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../styles/listCard.css';

function ListCard(props) {
  return (
    <Card className="card">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.listDetails.title}
          </Typography>
          <Typography component="p">
            by <Link to={routes.PROFILE+"/"+props.listDetails.owner}> {props.listDetails.owner} </Link>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary">
          View list ({props.listDetails.length} items)
        </Button>
      </CardActions>
    </Card>
  );
}

export default ListCard;