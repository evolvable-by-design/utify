import React, { Component } from "react";
import PrimarySearchAppBar from "./topNav";
import Grid from "@material-ui/core/Grid";
import API from "../../utils/API";
import SearchTopNav from "./searchTopNav";

class Search extends Component {
  state = {
    searchKeyword: this.props.location.state.referrer.searchKeyword,
    redirect: false,
    userid: localStorage.getItem("userid"),
    searchResults: []
  };

  componentDidMount() {
    this.loadSearchResults();
    this.setState({ redirect: this.props.location.state.referrer.redirect });
  }

  loadSearchResults = () => {
    API.passKeyword({
      keyword: this.state.searchKeyword,
      userid: this.state.userid
    })
      .then(res => {
        console.log(res);
        let searchResults = res.data.items;
        // console.log(searchResults);
        this.setState({ searchResults });
        console.log(this.state.searchResults);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.searchKeyword);
    return (
      <React.Fragment>
        <Grid container direction="row" alignItems="center" justify="center">
          <SearchTopNav />
        </Grid>

        {this.state.redirect ? (
          <Grid container direction="row" alignItems="center" justify="center">
            Search Results here
            {this.state.searchResults.map(searchResult => (
              <li key={searchResult.id.videoId}>
                {searchResult.snippet.title}
              </li>
            ))}
          </Grid>
        ) : (
          <div>
            Your search results from seach bar on search page is here . Not a
            redirect
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Search;
