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
    width: "60%",
    height: "auto"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class Search extends Component {
  state = {
    searchKeyword: this.props.location.state.referrer.searchKeyword,
    redirect: false,
    userid: localStorage.getItem("userid"),
    searchResults: [],
    open: false
  };

  handleClick = videoRecord => {
    this.setState({ open: true });
    console.log(
      "VideoId clicked by user " + this.state.userid + " is: " + videoRecord
    );
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  componentDidMount() {
    this.loadSearchResults();
    this.setState({ redirect: this.props.location.state.referrer.redirect });
  }

  loadSearchResults = () => {
    API.passKeyword({
      keyword: this.state.searchKeyword,
      userid: this.state.userid
    })
      .then(res => {
        console.log(res);
        let searchResults = res.data.items;
        // console.log(searchResults);
        this.setState({ searchResults });
        console.log(this.state.searchResults);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.searchKeyword);
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container direction="row" alignItems="center" justify="center">
          <SearchTopNav />
        </Grid>

        <Grid container direction="row" alignItems="center" justify="center">
          <div className={classes.gridRoot}>
            <GridList cellHeight={180} className={classes.gridList} cols={4}>
              <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
                <ListSubheader component="div">
                  Showing Results for {this.state.searchKeyword}
                </ListSubheader>
              </GridListTile>
              {this.state.searchResults.map(searchResult => (
                <GridListTile key={searchResult.id.videoId}>
                  <img
                    src={searchResult.snippet.thumbnails.medium.url}
                    alt={searchResult.snippet.channelTitle}
                  />
                  
                  <GridListTileBar
                    title={searchResult.snippet.title}
                    actionIcon={
                      <Tooltip title="Add to Watch List" placement="top-start">
                        <IconButton
                          className={classes.icon}
                          onClick={() => this.handleClick(searchResult)}
                        >
                          <PlaylistAdd />
                        </IconButton>
                      </Tooltip>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={this.state.open}
              autoHideDuration={3000}
              onClose={this.handleClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">Added to Watchlist</span>}
              action={[
                <Button
                  key="undo"
                  color="secondary"
                  size="small"
                  onClick={this.handleClose}
                >
                  UNDO
                </Button>,
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </div>
        </Grid>
        {/* Ternary goes here */}
      </React.Fragment>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);