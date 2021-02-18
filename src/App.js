import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import HomePage from "./components/HomePage";
import ViewBlog from "./components/ViewBlog";
import CreateBlog from "./components/CreateBlog";

import {APP_VIEW, URL} from './app.constants';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={URL.CREATE}>
          <CreateBlog view={APP_VIEW.CREATE_BLOG} />
        </Route>
        <Route path={URL.EDIT}>
          <CreateBlog view={APP_VIEW.EDIT_BLOG} />
        </Route>
        <Route path={URL.VIEW}>
          <ViewBlog view={APP_VIEW.VIEW_BLOG} />
        </Route>
        <Route path={URL.HOME}>
          <HomePage view={APP_VIEW.HOME} />
        </Route>
      </Switch>
    </Router>
  );
}
