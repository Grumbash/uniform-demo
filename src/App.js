import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";

import Page from "./pages/Page";

const useStyles = makeStyles((theme) => ({
  ul: {
    display: "flex",
  },
  li: {
    listStyleType: "none",
    margin: 10,
  },
}));

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
      <div>
        <nav>
          <ul className={classes.ul}>
            {data.pageCollection.items.map((e) => (
              <li key={e.linkTo} className={classes.li}>
                <Link to={e.linkTo}>{e.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
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
