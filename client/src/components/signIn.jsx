import React, { Component } from "react";
import logo from "./loginLogo.png";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  logoPosition: {
    // marginTop: `${theme.spacing.unit * 2}vh`
    // marginLeft: `-${theme.spacing.unit * 0.4}vh`
    paddingTop: "30px"
  },
  logo: {
    marginTop: `${theme.spacing.unit * 0.5}vh`,
    fontSize: "2em"
  },
  cr: {
    marginTop: `${theme.spacing.unit * 0.2}vh`,
    marginLeft: `-${theme.spacing.unit * 0.1}vh`,
    paddingLeft: "10px",
    fontSize: "0.9em"
  },
  line: {
    borderColor: "#FF8E53",
    width: "60em"
  },
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    // backgroundColor: theme.palette.secondary.main
    backgroundColor: "#FF8E53"
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: "#FF8E53",
    color: "white"
  },
  palette: {
    primary: "#00897b",
    secondary: "#00897b"
  }
});

// const { classes } = props;

class SignIn extends Component {
  handleSignIn = () => {
    this.props.history.replace("/members");
  };
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          xs={12}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <img src={logo} className={classes.logoPosition} />
          <div className={classes.logo}> UTIFY </div>
          <div className={classes.cr}> &copy; </div>
        </Grid>
        <Grid
          container
          xs={12}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <hr className={classes.line} />
        </Grid>

        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={this.handleSignIn}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(SignIn);
