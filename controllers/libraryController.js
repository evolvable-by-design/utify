const db = require("../models");

module.exports = {
  saveToLibrary: function(req, res) {
    let userid = req.body.userid;
    let videoRecord = req.body.videoRecord;
    console.log("this is " + userid + " and their Video Record" + videoRecord);
    console.log("test vedioREcord " + videoRecord.id.videoId);
    db.LibraryItem.create({
      userid: userid,
      videoId: videoRecord.id.videoId,
      thumbnailUrl: videoRecord.snippet.thumbnails.medium.url,
      channelTitle: videoRecord.snippet.channelTitle,
      title: videoRecord.snippet.title
    }).then(dbModel => {
      console.log(dbModel);
      res.json(dbModel);
    });
  }
};
