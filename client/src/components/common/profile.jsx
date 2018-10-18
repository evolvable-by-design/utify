import React, { Component } from "react";
import API from "../../utils/API";
import ImageAvatars from "../common/avatar";
import PrimarySearchAppBar from "./topNav";
import Grid from "@material-ui/core/Grid";
// import ProfileName from "./profilename";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FolderIcon from "@material-ui/icons/Folder";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Face from "@material-ui/icons/Face";

import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
// import ChipInput from "material-ui-chip-input";

import Chips from "./chip";

import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    width: "60%",
    backgroundColor: theme.palette.background.paper,
    height: 500
  },
  bigAvatar: {
    width: 200,
    height: 200,
    position: "relative"
  },
  profilePosition: {
    left: "35%",
    marginRight: 0,
    position: "relative",
    width: "50%",
    padding: "5%"
  },
  namePosition: {
    position: "relative",
    fontWeight: "bold",
    fontSize: "2em"
  }
});

class Profile extends Component {
  state = {
    userid: "",
    user: "",
    userObjDb: ""
  };
  componentDidMount() {
    const user = localStorage.getItem("user");
    const userid = localStorage.getItem("userid");
    if (user) {
      this.setState({ user });
      this.setState({ userid }, () => {
        this.loadProfile();
      }); // the setstate allows a callback after it is complete it executes thge load profile function
    }
  }

  loadProfile = () => {
    API.passUserId({
      userid: this.state.userid
    })
      .then(res => {
        // console.log("Profile Return:" + res.data);
        const userObjDb = res.data;
        this.setState({ userObjDb }, () => {
          console.log("Profile State is here:" + this.state.userObjDb);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = chips => {
    console.log(chips);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container direction="row" alignItems="center" justify="center">
          <PrimarySearchAppBar />
        </Grid>
        <Grid container direction="row" alignItems="center" justify="center">
          <div className={classes.root}>
            <List className={classes.profilePosition}>
              <Avatar
                alt={this.state.userid}
                src={this.state.userObjDb.picture}
                className={classes.bigAvatar}
              />

              <Typography
                variant="h4"
                gutterBottom
                className={classes.namePosition}
              >
                {this.state.user}
              </Typography>

              <ListItemText secondary={this.state.userid} />
            </List>

            <Chips />

            {/* <ChipInput
              defaultValue={["foo", "bar"]}
              onChange={chips => this.handleChange(chips)}
            /> */}
          </div>
        </Grid>
      </React.Fragment>
    );
  }
}

// ProfileName.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(Profile);
