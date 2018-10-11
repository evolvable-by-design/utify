import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Pivo from "@evolvable-by-design/pivo";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import API from "../utils/API";
import PrimarySearchAppBar from "./common/topNav";
import LibraryResults from "./common/libraryResults";

class MemberPage extends React.Component {
  state = {};

  render() {
    return (
      <Grid container direction="row" alignItems="center" justify="center">
        <PrimarySearchAppBar />
        <LibraryResults />
      </Grid>
    );
  }
}

export default MemberPage;