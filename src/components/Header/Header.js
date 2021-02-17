import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import {
  Button,
  Toolbar,
  Typography,
  IconButton,
  Container,
  CssBaseline,
} from "@material-ui/core";

import _map from "lodash/map";
import { useHistory } from "react-router-dom";

import { 
    NAVBAR_MENU_ITEMS, 
    APP_VIEW_VS_BUTTON_TEXT,
    APP_VIEW_VS_BUTTON_CLICK_HANDLER_URL,
 } from "./header.constants";
 import { URL } from '../../app.constants';

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    cursor: 'pointer',
  },
  menuItem: {
    flex: 1,
    textAlign: "center",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  toolbar: {
    borderBottom: "1px solid #d1d1d1",
  },
  searchButton: {
    marginRight: "0.6rem",
  },
}));

function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const { view } = props;
  const handleCreateBlogClick = () => history.push(APP_VIEW_VS_BUTTON_CLICK_HANDLER_URL[view]);
  const handleBlogHeaderClick = () => history.push(URL.HOME);

  return (
    <Container>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Typography onClick={handleBlogHeaderClick} className={classes.title}>Blogs</Typography>
        <IconButton
          className={classes.searchButton}
          aria-label="search"
          color="inherit"
        >
          <SearchIcon />
        </IconButton>
        <Button onClick={handleCreateBlogClick} variant="outlined">
          {APP_VIEW_VS_BUTTON_TEXT[view]}
        </Button>
      </Toolbar>
      <Toolbar component="nav">
        {_map(NAVBAR_MENU_ITEMS, (menuItem, index) => (
          <Typography key={index} component="a" className={classes.menuItem}>
            {menuItem}
          </Typography>
        ))}
      </Toolbar>
    </Container>
  );
}

export default Header;
