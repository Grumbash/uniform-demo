import React from "react";
import Typography from "@material-ui/core/Typography";
import Image from "material-ui-image";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  slide: {
    position: "relative",
  },
  slideContent: {
    position: "absolute",
    background: "rgba(17, 17, 26, 0.5)",
    backgroundBlendMode: "multiply",
    backdropFilter: "blur(15px)",
    /* Note: backdrop-filter has minimal browser support */
    borderRadius: "0px 20px 20px 20px",
    width: theme.spacing(74),
    minHeight: theme.spacing(32),
    left: theme.spacing(18.5),
    top: theme.spacing(22.5),
    padding: theme.spacing(8),
  },
  slideContentText: {
    color: "#fff",
  },
  learnMoreLink: {
    backgroundColor: "#F3B700",
    color: "#11111A",
    textDecoration: "none",
    padding: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: "bold",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[10],
    marginTop: theme.spacing(2),
    display: "inline-block",
  },
}));

function CarouselItem({
  item: {
    title,
    slideImage: { url },
  },
}) {
  const classes = useStyles();
  return (
    <div className={classes.slide}>
      <div className={classes.slideContent}>
        <Typography
          variant="h4"
          component="h4"
          className={classes.slideContentText}
        >
          {title}
        </Typography>
        <Link className={classes.learnMoreLink}>Learn more</Link>
      </div>

      <Image src={url} />
    </div>
  );
}

export default CarouselItem;
