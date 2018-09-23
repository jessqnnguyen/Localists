import React, {Component} from 'react';
// material-ui components
import Grid from '@material-ui/core/Grid';
import ListCard from './listCard.js';

function ListCardContainer(props) {
  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
      {props.lists.map (list => (
        <Grid item key={list.id}>
          <ListCard list={list} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ListCardContainer;