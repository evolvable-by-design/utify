// const { google } = require("googleapis");
// const sampleClient = require("./sampleclient");

// initialize the Youtube API library
// const youtube = google.youtube({
//   version: "v3",
//   auth: sampleClient.oAuth2Client
// });

// const scopes = ["https://www.googleapis.com/auth/youtube"];

module.exports = {
  search: function(req, res) {
    console.log(req.body);
    // youtube.search.list({
    //     part: "id,snippet",
    //     q: req.body.keyword
    //   }).then((searchResults) => {console.log(searchResults.data.items[0].snippet)})
  }
};

// sampleClient
//   .authenticate(scopes)
//   .then(runSample)
//   .catch(console.error);
