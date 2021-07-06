import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UniformTracker } from "@uniformdev/optimize-tracker-react";
import localTracker from "./tracker";
import App from "./App";

import "./index.css";

const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/l1znrfru9dsc?access_token=3iDGkjVgSvvFuykYi_WsPH2L2VDCPXsi2a1uNSqhQaY",
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <UniformTracker trackerInstance={localTracker}>
      <App />
    </UniformTracker>
  </ApolloProvider>,
  document.getElementById("root")
);
