import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";

import "./preLoginHome.css";
import logo from "./logo.png";
import "./preLoginHome.css";

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #00897b 30%, #FF8E53 90%)",
    borderRadius: 20,
    border: 0,
    color: "white",
    height: 48,
    width: 200,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

const styles = theme => ({
  signUpBtn: {
    marginTop: `${theme.spacing.unit * 0.05}vh`
  },
  logInBtn: {
    top: `-${theme.spacing.unit * 0.008}vh`
  },
  prompt: {
    color: "white"
  },
  logoPosition: {
    marginTop: `${theme.spacing.unit * 4.3}vh`,
    marginLeft: `-${theme.spacing.unit * 0.4}vh`
  },
  logo: {
    marginTop: `${theme.spacing.unit * 4.5}vh`,
    paddingLeft: "10px",
    fontSize: "2em"
  },
  cr: {
    marginTop: `${theme.spacing.unit * 4.3}vh`,
    marginLeft: `-${theme.spacing.unit * 0.09}vh`,
    paddingLeft: "10px",
    fontSize: "0.9em"
  }
});

const PreLoginHome = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <div className="section section-fullscreen">
        <Grid
          container
          xs={12}
          container
          direction="row"
          alignItems="center"
          justify="center"
        >
          <img src={logo} className={classes.logoPosition} />
          <logo className={classes.logo}> UTIFY </logo>
          <cr className={classes.cr}> &copy; </cr>
        </Grid>
        <Grid
          container
          xs={12}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <StyledButton className={classes.signUpBtn}> SIGN UP </StyledButton>
        </Grid>
        <Grid
          container
          xs={12}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <p className={classes.prompt}>Already have an account ?</p>
        </Grid>
        <Grid
          container
          xs={12}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <StyledButton className={classes.logInBtn}> LOG IN </StyledButton>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(PreLoginHome);
