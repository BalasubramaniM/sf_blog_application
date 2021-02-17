import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';

import { NO_DATA } from '../../app.constants';

const useStyles = makeStyles({
  root: {
    width: 396,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    marginRight: '1.2rem',
    marginTop: '1.2rem',
    '&:nth-child(3n)': {
        marginRight: 0,
    }
  },
  media: {
    height: 140,
  },
});

export default function BlogCard(props) {
  const {blog} = props;
  const {id, text = NO_DATA, timestamp, title=NO_DATA} = blog;
  const classes = useStyles();
  const date = moment(timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");

  return (
    <Card key={id} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/mk7D-4UCfmg/1600x900"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
