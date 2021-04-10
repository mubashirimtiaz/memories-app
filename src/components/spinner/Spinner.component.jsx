import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
  },
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <CircularProgress color="inherit" className={classes.root} size={20} />
  );
}
