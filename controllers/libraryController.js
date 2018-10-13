const db = require("../models");

module.exports = {
  saveToLibrary: function(req, res) {
    let userid = req.body.userid;
    let videoRecord = req.body.videoRecord;
    let tag = req.body.tag;
    console.log("this is " + userid + " and their Video Record" + videoRecord);
    console.log("test vedioREcord " + videoRecord.id.videoId);
    db.LibraryItem.create({
      userid: userid,
      videoId: videoRecord.id.videoId,
      thumbnailUrl: videoRecord.snippet.thumbnails.medium.url,
      channelTitle: videoRecord.snippet.channelTitle,
      title: videoRecord.snippet.title,
      tag: tag
    }).then(dbModel => {
      console.log(dbModel);
      res.json(dbModel);
    });
  }
};
