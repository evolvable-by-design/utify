import React, { useEffect, useState } from "react";
import Pivo from "@evolvable-by-design/pivo";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import API from "../utils/API";
import { Vocabulary } from '../vocabulary';
import config from "./config";

class MemberPage extends React.Component {
  state = {
    searchKeyword: "",
    user: ""
  };

  constructor(props) {
    super(props)
    this.api = props.api
  }

  componentDidMount() {
    const user = localStorage.getItem("user");
    this.setState({ user });
  }

  searchField = React.createRef();

  handleSubmit = e => {
    e.preventDefault();

    console.log(`the search key word is ${this.state.searchKeyword}`);

    this.api.passKeyword({
      [Vocabulary.keyword]: this.state.searchKeyword
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
              fullWidth
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

const MemberPageWithApi = () => {
  const [pivo, setPivo] = useState()

  useEffect(() => {
    Pivo.fetchDocumentationAndCreate(
      config['DOCUMENTATION_URL'],
      config['DOCUMENTATION_FETCHING_METHOD']
    ).then(setPivo)
  }, [])

  if (pivo !== undefined) {
    return <MemberPage api={new API(pivo)} />
  } else {
    return <p>Loading...</p>
  }
}

export default MemberPageWithApi;