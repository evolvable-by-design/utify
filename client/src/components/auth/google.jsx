import React, { Component } from "react";

class Google extends Component {
  state = { response: "" };

  render() {
    return <p className="Test">Google call back URI reached</p>;
  }
}

export default Google;
