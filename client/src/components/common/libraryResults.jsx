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
import Typography from "@material-ui/core/Typography";

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
  root: {
    width: "60%"
  },
  gridList: {
    width: "90%",
    height: "auto",
    paddingBottom: 30
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  close: {
    padding: theme.spacing.unit / 2
  },
  subHeader: {
    marginLeft: -22
  },
  subheadingStyle: {
    marginLeft: 55,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 5
  },
  uhohStyle: {
    width: "60%",
    height: 300,
    backgroundColor: "white"
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
    const resultsLength = this.state.libraryResults.length;
    console.log(resultsLength);
    const { classes } = this.props;
    const urlPrefix = "https://www.youtube.com/watch?v=";
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          className={classes.root}
        >
          {resultsLength ? (
            <div className={classes.gridRoot}>
              <Grid
                container
                direction="row"
                className={classes.subheadingStyle}
              >
                Your Watch List
              </Grid>
              <GridList cellHeight={180} className={classes.gridList} cols={4}>
                <GridListTile
                  key="Subheader"
                  cols={4}
                  style={{ height: "auto" }}
                >
                  {/* <ListSubheader component="div" className={classes.subHeader}>
                    Your Watch List:
                  </ListSubheader> */}
                </GridListTile>
                {this.state.libraryResults.map(libraryResult => (
                  <GridListTile key={libraryResult.videoId}>
                    <a target="_blank" href={urlPrefix + libraryResult.videoId}>
                      <img
                        src={libraryResult.thumbnailUrl}
                        alt={libraryResult.channelTitle}
                      />
                    </a>
                    <GridListTileBar title={libraryResult.title} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          ) : (
            <div classeName={classes.uhohStyle}>
              <Typography component="h2" variant="h1" gutterBottom>
                Uh Oh! You dont have any videos saved! Try searching for
                something now!
              </Typography>
            </div>
          )}
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
