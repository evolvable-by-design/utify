import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import login from "./components/login";
import "./App.css";
import PreLoginHome from "./components/preLoginHome";
import CardMedia from "@material-ui/core/CardMedia";
import MemberPage from "./components/memberPage";
import Google from "./components/auth/google";
import Profile from "./components/common/profile";

class App extends Component {
  render() {
    return (
      <div>
        <div className="content">
          {/* Switch will render the first child that matches the location */}
          <Switch>
            <Route path="/members" component={MemberPage} />
            <Route path="/auth/login" component={login} />
            <Route path="/profile" component={Profile} />
            {/* <Route path="/auth/google/redirect" component={Google} /> */}
            <Route exact path="/" component={PreLoginHome} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
