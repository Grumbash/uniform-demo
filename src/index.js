import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/1xdlbs34uw51?access_token=m2MzjcPA7PfSHOGQsgtA94xVhkKBUn30LYcHP_B0y4c",
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
