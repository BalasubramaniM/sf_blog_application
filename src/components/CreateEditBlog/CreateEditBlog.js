import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

import cogoToast from "cogo-toast";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

import {
  Container,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

import Header from "../Header";

import { createBlog } from "../../app.apiActions";

const useStyles = makeStyles((theme) => ({
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

export default function CreateEditBlog(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
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
    createBlog(payload).then((res) => {
      debugger;
      cogoToast.success("Blog has been successfully created.");
      setSuccess(true);
      setLoading(false);
    });
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
    <Container>
      <Header {...props} />
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
              Accept terms
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}
