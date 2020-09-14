import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import green from "@material-ui/core/colors/green";
import teal from "@material-ui/core/colors/teal";
import { Redirect } from "react-router";
import { browserHistory, withRouter } from "react-router-dom";
import ImageAvatars from "./avatar";
import API from "../../utils/API";
import YouTubeVideo from "./videoResult";

const styles = theme => ({
  root: {
    width: "60%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  palette: {
    primary: green,
    secondary: teal
  },
  videoGridStyle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
});

class SearchTopNav extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    searchKeyword: "",
    user: "",
    userid: "",
    searchResults: []
  };

  componentDidMount() {
    const user = localStorage.getItem("user");
    const userid = localStorage.getItem("userid");
    this.setState({ user });
    this.setState({ userid });
  }

  searchField = React.createRef();

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

  handleSubmit = e => {
    e.preventDefault();
    console.log(`the search key word is ${this.state.searchKeyword}`);
    this.loadSearchResults();
  };

  handleChange = e => {
    let searchKeyword = this.state.searchKeyword;
    searchKeyword = e.currentTarget.value;
    this.setState({ searchKeyword });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem>
          <Link to="/profile">Profile</Link>
        </MenuItem>
        <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge
              className={classes.margin}
              badgeContent={4}
              color="secondary"
            >
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge
              className={classes.margin}
              badgeContent={11}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
            {/* <ImageAvatars imageUrl={localStorage.getItem.imageUrl} /> */}
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="title"
              color="inherit"
              noWrap
            >
              Utify
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.handleSubmit}>
                <Input
                  ref={this.searchField}
                  autoFocus
                  value={this.state.searchKeyword}
                  onChange={this.handleChange}
                  placeholder="Search Your Tracks..."
                  disableUnderline
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </form>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge
                  className={classes.margin}
                  badgeContent={4}
                  color="secondary"
                >
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge
                  className={classes.margin}
                  badgeContent={17}
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}

        {/* <div>Your search results here below</div> */}
        {/* {this.state.searchResults.map(searchResult => (
          <li key={searchResult.id.videoId}>{searchResult.snippet.title}</li>
        ))} */}
        <div className={classes.videoGridStyle}>
          <GridList
            className={classes.gridList}
            cols={5}
            spacing={4}
            cellHeight={"auto"}
          >
            {this.state.searchResults.map(searchResult => (
              <GridListTile key={searchResult.id.videoId}>
                <img
                  src={searchResult.snippet.thumbnails.medium.url}
                  alt={searchResult.snippet.channelTitle}
                />
                <GridListTileBar
                  title={searchResult.snippet.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  actionIcon={
                    <IconButton>
                      <StarBorderIcon className={classes.title} />
                    </IconButton>
                  }
                />
                {/* <YouTubeVideo videoId={searchResult.id.videoId} /> */}
                {/* <IconButton aria-label="Delete" className={classes.button}>
                  <FavoriteIcon fontSize="small" />
                </IconButton> */}
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

SearchTopNav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchTopNav);