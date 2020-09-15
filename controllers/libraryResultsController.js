const db = require("../models");

module.exports = {
  showResults: function(req, res) {
    let userid = req.body.userid;
    let tag = req.body.tag;
    console.log("this is " + userid + "to present library items");
    db.LibraryItem.find({
      userid: userid,
      tag: tag
    }).then(dbModel => {
      console.log(dbModel);
      res.json(dbModel);
    });
  }
};
