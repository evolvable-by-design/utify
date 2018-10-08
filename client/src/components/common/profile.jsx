import React, { Component } from "react";
import API from "../../utils/API";
import ImageAvatars from "../common/avatar";

class Profile extends Component {
  state = {
    userid: "",
    user: "",
    userObjDb: ""
  };
  componentDidMount() {
    const user = localStorage.getItem("user");
    const userid = localStorage.getItem("userid");
    if (user) {
      this.setState({ user });
      this.setState({ userid }, () => {
        this.loadProfile();
      }); // the setstate allows a callback after it is complete it executes thge load profile function
    }
  }

  loadProfile = () => {
    API.passUserId({
      userid: this.state.userid
    })
      .then(res => {
        // console.log("Profile Return:" + res.data);
        const userObjDb = res.data;
        this.setState({ userObjDb }, () => {
          console.log("Profile State is here:" + this.state.userObjDb);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        User Id: {this.state.userid}
        <br />
        User Name:
        {this.state.user}
        <br />
        Profile Picture:
        <ImageAvatars imageUrl={this.state.userObjDb.picture} />
        <br />
        Gender: {this.state.userObjDb.gender}
      </div>
    );
  }
}

export default Profile;
