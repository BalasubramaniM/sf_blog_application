import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import cogoToast from "cogo-toast";

import _isNil from "lodash/isNil";

import {
  Container,
  Typography,
  LinearProgress,
} from "@material-ui/core";

import Header from "../Header";

import { getBlog } from "../../app.apiActions";
import { useQuery } from "../../app.helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  blogContainer: {
    marginTop: '2.4rem',
  },
  content: {
    marginTop: '2.4rem'
  },
  title: {
    fontSize: '1.6rem'
  }
}));

export default function CreateBlog(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  let query = useQuery();

  const getBlogAction = (id) => {
    setLoading(true);
    getBlog(id).then((res) => {
      if (!res) {
        cogoToast.error("Blog not found.");
        setLoading(false);
        return;
      }

      const { title, text } = res;
      setTitle(title);
      setContent(text);
      setLoading(false);
    });
  };

  useEffect(() => {
    const id = query.get("id");
    if (_isNil(id)) {
      cogoToast.error("Blog not found.");
      return;
    }
    getBlogAction(id);
  }, []);

  return (
    <Container className={classes.container}>
      <Header {...props} />
      {loading ? (
        <LinearProgress />
      ) : (
        <Container className={classes.blogContainer}>
          <Typography className={classes.title} component="h2">
            {title}
          </Typography>
          <Typography className={classes.content} component="p">
            {content}
          </Typography>
        </Container>
      )}
    </Container>
  );
}
