const db = require("../models");

module.exports = {
  chipData: function(req, res) {
    let userid = req.body.userid;
    console.log("this is userid trying to get chip data " + userid);

    db.UserChip.find({
      userid: userid
    }).then(dbModel => {
      console.log(dbModel);
      res.json(dbModel);
    });
  }
};
