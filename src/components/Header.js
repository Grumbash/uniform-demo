import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useUniformTracker } from "@uniformdev/optimize-tracker-react";
import { Link } from "react-router-dom";

import logo from "../assets/logo-nav.png";

const useStyles = makeStyles((theme) => ({
  ul: {
    display: "flex",
    margin: 0,
    padding: theme.spacing(2),
    fontSize: theme.spacing(2),
    color: "#99A9B5",
  },
  li: {
    listStyleType: "none",
    margin: 10,
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2.5),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
  },
}));

const Header = ({ data }) => {
  const { tracker } = useUniformTracker();
  const classes = useStyles();

  const onClick = (elem) => async (e) => {
    switch (elem.linkTo) {
      case "/about":
        await tracker?.addEvent({
          label: "about",
          category: "about",
          value: "about",
        });
        break;

      case "/grand-prix":
        await tracker?.addEvent({
          label: "grandPrix",
          category: "grandPrix",
          value: "grandPrix",
        });
        break;
      default:
        break;
    }
  };

  return (
    <nav className={classes.nav}>
      <img src={logo} alt="Formula 1 logo"></img>
      <ul className={classes.ul}>
        {data.pageCollection.items.map((e) => (
          <li key={e.linkTo} className={classes.li}>
            <Link to={e.linkTo} onClick={onClick(e)}>
              {e.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
