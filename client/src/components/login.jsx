import React, { Component } from "react";
import { AuthenticationService } from "@evolvable-by-design/pivo";
import logo from "./loginLogo.png";
import { GoogleLogin } from "react-google-login";
import config from "./config.json";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";

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

class login extends Component {
  state = { isAuthenticated: false, user: null, token: "" };

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      const isAuthenticated = true;
      this.setState({ isAuthenticated });
      this.setState({ user });
    }
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    AuthenticationService.removeToken();
  };

  goToLibrary = () => {
    this.props.history.push("/members");
  };

  googleResponse = response => {
    console.log(response);
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    // fetch("http://localhost:3001/api/v1/auth/google", options).then(r => {
    fetch("/api/v1/auth/google", options).then(r => {
      const token = r.headers.get("x-auth-token");
      r.json().then(user => {
        if (token) {
          this.setState({ isAuthenticated: true, user, token });
          console.log(this.state.user);
          localStorage.setItem("token", this.state.token);
          localStorage.setItem("user", this.state.user.fullName);
          localStorage.setItem("userid", this.state.user._id);
          localStorage.setItem("imageUrl", this.state.user.picture);
          AuthenticationService.updateToken(token);
          this.props.history.replace("/members");
        }
      });
    });
  };
  onFailure = error => {
    alert(error);
  };

  render() {
    const { classes } = this.props;
    let content = !!this.state.isAuthenticated ? (
      <div>
        <p>Hi, {localStorage.getItem("user")}. You are Authenticated</p>
        <button className="button" onClick={this.goToLibrary}>
          Back to Library
        </button>
        {/* <div>{localStorage.getItem("user")}</div>
        <div>{this.state.user.email}</div> */}
        <br />
        <br />
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <div>
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Google"
          onSuccess={this.googleResponse}
          onFailure={this.googleResponse}
          cursor="pointer"
        />
      </div>
    );

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
        <Grid
          container
          xs={12}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <div className="App">{content}</div>
          {console.log(this.state.user)}
        </Grid>
        <CssBaseline />
      </div>
    );
  }
}

export default withStyles(styles)(login);
