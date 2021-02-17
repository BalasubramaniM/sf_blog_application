import axios from "axios";
import cogoToast from "cogo-toast";

import _get from "lodash/get";

import { EMPTY_ARRAY } from "./app.constants";

const BASE_URL = "https://salesforce-blogs.herokuapp.com/blogs/api";

export const fetchAllBlogs = () =>
  axios
    .get(`${BASE_URL}/`)
    .then((res) => {
      return _get(res, "data", EMPTY_ARRAY);
    })
    .catch(() => {
      cogoToast.error("Error in fetching data.");
      return EMPTY_ARRAY;
    });

export const createBlog = (payload) =>
  axios
    .post(`${BASE_URL}/`, payload)
    .then((res) => {
      return _get(res, "data", EMPTY_ARRAY);
    })
    .catch((err) => {
      cogoToast.error("Failed to create blog.");
      return null;
    });
