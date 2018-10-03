import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import API from "../utils/API";

class MemberPage extends Component {
  state = {
    searchKeyword: "",
    user: "",
    userid: ""
  };
  componentDidMount() {
    const user = localStorage.getItem("user");
    const userid = localStorage.getItem("userid");
    this.setState({ user });
    this.setState({ userid });
  }

  searchField = React.createRef();

  handleSubmit = e => {
    e.preventDefault();

    console.log(`the search key word is ${this.state.searchKeyword}`);
    API.passKeyword({
      keyword: this.state.searchKeyword,
      userid: this.state.userid
    });
  };

  handleChange = e => {
    let searchKeyword = this.state.searchKeyword;
    searchKeyword = e.currentTarget.value;
    this.setState({ searchKeyword });
  };

  render() {
    return (
      <div>
        <div>Hello {this.state.user}</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField
              ref={this.searchField}
              autoFocus
              value={this.state.searchKeyword}
              onChange={this.handleChange}
              id="filled-full-width"
              label="Search YouTube Tracks"
              style={{ margin: 6 }}
              placeholder="Sart Typing"
              margin="normal"
              variant="filled"
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default MemberPage;
