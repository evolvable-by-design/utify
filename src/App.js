import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "./components/signIn";
import "./App.css";
import PreLoginHome from "./components/preLoginHome";
import CardMedia from "@material-ui/core/CardMedia";
import MemberPage from "./components/memberPage";

class App extends Component {
  render() {
    return (
      <div>
        <div className="content">
          {/* Switch will render the first child that matches the location */}
          <Switch>
            <Route path="/members" component={MemberPage} />
            <Route path="/signin" component={SignIn} />
            <Route path="/" component={PreLoginHome} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
