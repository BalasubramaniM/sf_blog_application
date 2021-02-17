import logo from "./logo.svg";
import "./App.scss";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomePage from "./components/HomePage";
import CreateEditBlog from "./components/CreateEditBlog";
import {APP_VIEW, URL} from './app.constants';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={URL.CREATE}>
          <CreateEditBlog view={APP_VIEW.CREATE_BLOG} />
        </Route>
        <Route path={URL.EDIT}>
          <CreateEditBlog view={APP_VIEW.EDIT_BLOG} />
        </Route>
        <Route path={URL.VIEW}>
          <CreateEditBlog view={APP_VIEW.VIEW_BLOG} />
        </Route>
        <Route path={URL.HOME}>
          <HomePage view={APP_VIEW.HOME} />
        </Route>
      </Switch>
    </Router>
  );
}
