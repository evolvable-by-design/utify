import React, { useEffect, useState } from "react";
import Pivo from "@evolvable-by-design/pivo";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import API from "../utils/API";
import PrimarySearchAppBar from "./common/topNav";

class MemberPage extends React.Component {
  state = {};

  render() {
    return <PrimarySearchAppBar />;
  }
}

export default MemberPage;