import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  green: {
    color: "#0e8750",
    fontWeight: 600,
    fontSize: 22,
    lineHeight: 30,
    background: "#DEDEE9",
    width:50,
    height:50
  },
}));

export default function LetterAvatars({first}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar className={classes.green}>{first}</Avatar>
    </div>
  );
}
