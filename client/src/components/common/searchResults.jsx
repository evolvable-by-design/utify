import React, { Component } from "react";
import { Divider } from "@material-ui/core";

class SearchResults extends Component {
  state = {
    searchResults: ["test1", "test2", "test3"]
  };

  componentDidMount() {
    console.log("From search results" + this.state.searchResults);
  }

  render() {
    return (
      <div>
        This is from results page
        {this.state.searchResults.map(searchResult => (
          <li key={searchResult.id.videoId}>{searchResult.snippet.title}</li>
        ))}
      </div>
    );
  }
}

export default SearchResults;
