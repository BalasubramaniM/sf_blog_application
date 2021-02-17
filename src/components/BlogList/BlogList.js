import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import axios from 'axios';
import _get from 'lodash/get';

import {fetchAllBlogs} from '../../app.apiActions';

import { EMPTY_ARRAY } from "../../app.constants";

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
// import  from '@material-ui/core/Card';

import BlogCard from "../BlogCard";
// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginBottom: "1.2rem",
  },
  gridList: {
    width: "100%",
    margin: "0 !important", // since margin of 2px is applied by default to Grid List from Material UI.
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  mainCard: {
    width: "100%",
    height: "400px",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
  },
  media: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
}));

export default function BlogList() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllBlogs().then((res) => setData(res));
  }, []);

  return (
    <div className={classes.root}>
      <Card className={classes.mainCard}>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/hjwKMkehBco/1600x900"
          title="Contemplative Reptile"
        />
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <GridList className={classes.gridList}>
        {data.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </GridList>
    </div>
  );
}
