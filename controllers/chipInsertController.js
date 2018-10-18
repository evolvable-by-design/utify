const db = require("../models");

module.exports = {
  chipInsert: function(req, res) {
    let userid = req.body.userid;
    let chip = req.body.chip;
    console.log(
      "this is userid for chip data " + userid + " submits chip " + chip
    );

    db.UserChip.findOneAndUpdate(
      { userid: userid },
      { $push: { chips: { label: chip } } },
      { upsert: true, returnNewDocument: true }
    ).then(dbModel => {
      console.log(dbModel);
      res.json(dbModel);
    });
  }
};
