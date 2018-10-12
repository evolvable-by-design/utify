import React from "react";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "./common/topNav";
import LibraryResults from "./common/libraryResults";
import Carousal from "./common/carousal";

class MemberPage extends React.Component {
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