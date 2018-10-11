import React, { Component } from "react";
import PrimarySearchAppBar from "./topNav";
import Grid from "@material-ui/core/Grid";
import API from "../../utils/API";
import SearchTopNav from "./searchTopNav";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import PlayArrow from "@material-ui/icons/PlayArrow";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import Tooltip from "@material-ui/core/Tooltip";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "55%",
    height: "auto"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class LibraryResults extends Component {
  state = {
    userid: localStorage.getItem("userid"),
    libraryResults: []
  };

  loadLibraryResults = () => {
    API.passUserIdVideoLibraryResults({
      userid: this.state.userid
    })
      .then(res => {
        console.log(res.data);
        let libraryResults = res.data;

        this.setState({ libraryResults });
        console.log(this.state.libraryResults);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.loadLibraryResults();
    // this.setState({ redirect: this.props.location.state.referrer.redirect });
  }

  render() {
    console.log(this.state.libraryResults);
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container direction="row" alignItems="center" justify="center">
          <div className={classes.gridRoot}>
            <GridList cellHeight={180} className={classes.gridList} cols={4}>
              <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
                <ListSubheader component="div">
                  Showing Your Library Watchlist Below:
                </ListSubheader>
              </GridListTile>
              {this.state.libraryResults.map(libraryResult => (
                <GridListTile key={libraryResult.videoId}>
                  <img
                    src={libraryResult.thumbnailUrl}
                    alt={libraryResult.channelTitle}
                  />
                  <GridListTileBar title={libraryResult.title} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Grid>
        {/* Ternary goes here */}
      </React.Fragment>
    );
  }
}

LibraryResults.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LibraryResults);
