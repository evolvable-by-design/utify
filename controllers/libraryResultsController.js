const db = require("../models");

module.exports = {
  showResults: function(req, res) {
    let userid = req.body.userid;
    console.log("this is " + userid + "to present library items");
    db.LibraryItem.find({
      userid: userid
    }).then(dbModel => {
      console.log(dbModel);
      res.json(dbModel);
    });
  }
};
