import React, { useState, useEffect } from "react";

import cogoToast from "cogo-toast";
import { stubFalse } from "lodash";
import { useHistory } from "react-router-dom";

import { fetchAllBlogs, deleteBlog } from "../../app.apiActions";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  LinearProgress,
  GridList,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import BlogCard from "../BlogCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: 'column',
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
  progressBar: {
    marginTop: '2.4rem'
  }
}));

export default function BlogList() {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(stubFalse);
  const [open, setOpen] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

  useEffect(() => {
    fetchAllBlogs().then((res) => setData(res));
  }, []);

  const onDeleteBlog = (id) => () => {
    setOpen(true);
    setCurrentBlogId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteBlogAction = () => {
    setLoading(true);
    deleteBlog(currentBlogId).then((res) => {
      if (!res) return;
      cogoToast.success("Blog has been successfully deleted.");
      setTimeout(() => {
        history.go(0);
      });
    }).finally(() => {
      setLoading(false);
    });
    setOpen(false);
  };

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
              Blogs
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Publish your passions your way.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {loading ? (
        <LinearProgress className={classes.progressBar} />
      ) : (
        <GridList className={classes.gridList}>
          {data.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onDeleteBlog={onDeleteBlog} />
          ))}
        </GridList>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this blog?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={deleteBlogAction} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
