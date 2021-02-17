import React, { Suspense } from "react";
import {
  Container,
  LinearProgress
} from "@material-ui/core";

import Header from '../Header';

const BlogList = React.lazy(() => import("../BlogList"));

function HomePage(props) {
  return (
    <Container>
      <Header {...props} />
      <Suspense fallback={<LinearProgress />}>
        <BlogList />
      </Suspense>
    </Container>
  );
}

export default HomePage;
