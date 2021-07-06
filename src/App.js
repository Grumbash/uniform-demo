import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";

import Page from "./pages/Page";
import Header from "./components/Header";

const PAGES = gql`
  query getPages {
    pageCollection {
      items {
        name
        linkTo
        sys {
          id
        }
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#11111A",
  },
}));

function App() {
  const { loading, error, data } = useQuery(PAGES);
  const classes = useStyles();

  if (error) {
    return <div>Error :(</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className={classes.main}>
        <Header data={data} />
        <Switch>
          <Route>
            <Page pageCollection={data.pageCollection.items} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
