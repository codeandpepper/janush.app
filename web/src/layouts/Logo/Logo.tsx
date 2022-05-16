import React from "react";

import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";

export const Logo: React.VFC = () => {
  const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.title}>
      <Link
        to="/"
        data-testid="logo-button-in-top-app-bar"
        className={classes.logotype}
      >
        janush-auto-generated-app
      </Link>
    </Typography>
  );
};
