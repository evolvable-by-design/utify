import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import PreLoginHome from "./components/preLoginHome";
import CardMedia from "@material-ui/core/CardMedia";

class App extends Component {
  render() {
    return (
      <div>
        <PreLoginHome component="img" />
      </div>
    );
  }
}

export default App;
