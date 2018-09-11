import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


// for now, home is a functional component
function Home(props) {
  return (
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
  );
}

export default Home;
