import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import API from "../../utils/API";

const options = ["Lifestyle", "Comedy", "Music Videos", "Motivational"];

const ITEM_HEIGHT = 48;

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class TagVideo extends React.Component {
  state = {
    anchorEl: null,
    videoRecord: this.props.video,
    userid: localStorage.getItem("userid"),
    option: "",
    open: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = option => {
    this.setState({ anchorEl: null });
    this.setState({ open: true });

    this.setState({ option }, () => {
      console.log("option selcted: " + this.state.option);
      const optionTypeOf = typeof this.state.option;
      console.log(optionTypeOf);
      console.log("video Selected: " + this.state.videoRecord.snippet.title);
      if (optionTypeOf === "string") {
        API.passUserIdVideo({
          videoRecord: this.state.videoRecord,
          userid: this.state.userid,
          tag: this.state.option
        })
          .then(res => {
            console.log(res.data);
            //   let searchResults = res.data.items;

            //   this.setState({ searchResults });
            //   console.log(this.state.searchResults);
          })
          .catch(err => {
            console.log(err);
          });
      } else "no option slected. the cursor clicked out of menu and so escaped";
    });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? "long-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon color={"secondary"} />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 3,
              width: 150
            }
          }}
        >
          {options.map(option => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={() => this.handleClose(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackBar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">Added to {this.state.option} Watchlist</span>
          }
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleCloseSnackBar}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackBar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

TagVideo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TagVideo);
