import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import API from "../utils/API";
import PrimarySearchAppBar from "./common/topNav";
import LibraryResults from "./common/libraryResults";
import Carousal from "./common/carousal";

import "./membersPage.css";

class MemberPage extends Component {
  state = {
    userid: localStorage.getItem("userid"),
    tagData: []
  };

  componentDidMount() {
    this.loadTagData();
  }

  loadTagData = () => {
    API.passUserIdGetChipData({
      userid: this.state.userid
    })
      .then(res => {
        console.log(res.data[0].chips);
        let tagData = res.data[0].chips;
        this.setState({ tagData }, () => {
          console.log("updated tag data " + this.state.tagData[0]);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Grid container direction="row" alignItems="center" justify="center">
        <PrimarySearchAppBar />
        <Carousal />
        {/* <LibraryResults tag="Motivational" />
        <LibraryResults tag="Comedy" />
        <LibraryResults tag="Lifestyle" />
        <LibraryResults tag="Music Videos" /> */}

        {this.state.tagData.map(tag => (
          <LibraryResults key={tag._id} tag={tag.label} />
        ))}
      </Grid>
    );
  }
}

export default MemberPage;
