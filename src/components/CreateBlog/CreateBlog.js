import React, { useState, useEffect } from "react";
import clsx from "clsx";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";

import _get from "lodash/get";
import _isNil from "lodash/isNil";
import _isEmpty from "lodash/isEmpty";

import {
  Container,
  TextField,
  Button,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../Header";

import { useQuery } from "../../app.helpers";
import { URL, APP_VIEW } from "../../app.constants";
import { createBlog, getBlog, editBlog } from "../../app.apiActions";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  root: {
    width: "60%",
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginBottom: "1.2rem",
  },
  editorContainer: {
    margin: "2.4rem",
  },
  wrapper: {
    marginTop: "1.2rem",
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CreateBlog(props) {
  const { view } = props;

  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getBlogAction = (id) => {
    setIsBlogLoading(true);
    getBlog(id).then((res) => {
      if (!res) {
        cogoToast.error("Blog not found.");
        setIsBlogLoading(false);
        return;
      }
      const { title, text } = res;
      setTitle(title);
      setContent(text);
      setIsBlogLoading(false);
    });
  };

  useEffect(() => {
    if (view !== APP_VIEW.EDIT_BLOG) return;

    const id = query.get("id");
    if (_isNil(id)) {
      cogoToast.error("Blog not found.");
      return;
    }
    getBlogAction(id);
  }, []);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const createBlogHandler = (payload) =>
    createBlog(payload).then((res) => {
      if (!res) {
        setSuccess(true);
        setLoading(false);
        return;
      }
      const { id } = res;
      cogoToast.success("Blog has been successfully created.");
      setSuccess(true);
      setLoading(false);
      history.push(`${URL.VIEW}/?id=${id}`);
    });

  const editBlogHandler = (id, payload) =>
    editBlog(id, payload).then((res) => {
      if (!res) {
        setSuccess(true);
        setLoading(false);
        return;
      }
      const { id } = res;
      cogoToast.success("Blog has been successfully edited.");
      setSuccess(true);
      setLoading(false);
      history.push(`${URL.VIEW}/?id=${id}`);
    });

  const handleButtonClick = () => {
    if (_isEmpty(title) || _isEmpty(content)) {
      cogoToast.error("Form fields cannot be empty.");
      return;
    }
    setSuccess(false);
    setLoading(true);
    const payload = {
      title,
      text: content,
    };
    if (view !== APP_VIEW.EDIT_BLOG) {
      createBlogHandler(payload);
      return;
    }
    const id = query.get("id");
    editBlogHandler(id, payload);
  };

  const onChangeTitle = (e) => {
    const title = _get(e, "target.value", "");
    setTitle(title);
  };

  const onChangeContent = (e) => {
    const content = _get(e, "target.value", "");
    setContent(content);
  };

  return (
    <Container className={classes.container}>
      <Header {...props} />
      {isBlogLoading ? (
        <LinearProgress />
      ) : (
        <div className={classes.editorContainer}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Title"
              fullWidth
              className={classes.textField}
              value={title}
              onChange={onChangeTitle}
            />
            <TextField
              id="standard-textarea"
              label="Content"
              placeholder="Once upon a time ..."
              multiline
              fullWidth
              className={classes.textField}
              value={content}
              onChange={onChangeContent}
            />
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                className={buttonClassname}
                disabled={loading}
                onClick={handleButtonClick}
              >
                Save
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </form>
        </div>
      )}
    </Container>
  );
}
