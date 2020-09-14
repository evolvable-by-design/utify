require("../mongoose")();
const User = require("mongoose").model("User");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const config = require("../config");

module.exports = {
  search: function(req, res) {
    let keyword = req.body.keyword;
    let userid = req.body.userid;
    console.log("this is search keyword " + keyword + "from userid " + userid);
    res.send("hello");

    User.findOne({ _id: userid })
    .select("+googleProvider")
    .then(dbModel => {
      console.log(dbModel);
      var oauth2Client = new OAuth2(
        config.googleAuth.clientID,
        config.googleAuth.clientSecret,
        config.googleAuth.callbackurl
      );

      oauth2Client.credentials = {
        access_token: dbModel.googleProvider.token
        // refresh_token: req.user.refresh_token
      };

      google
        .youtube({
          version: "v3",
          auth: oauth2Client
        })
        .search.list({
          part: "id,snippet",
          q: keyword
        })
        .then(data => {
          //   res.send("you tube data received");
          console.log("here itis" + data.data.items[1].snippet.title);
          // res.json(data.data);
        });
    });
  }
};