import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import API from "../utils/API";
import PrimarySearchAppBar from "./common/topNav";
import LibraryResults from "./common/libraryResults";
import Carousal from "./common/carousal";

import "./membersPage.css";

class MemberPage extends Component {
  state = {};

  render() {
    return (
      <Grid container direction="row" alignItems="center" justify="center">
        <PrimarySearchAppBar />
        <Carousal />
        <LibraryResults />
      </Grid>
    );
  }
}

export default MemberPage;
