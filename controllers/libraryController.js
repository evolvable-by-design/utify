require("../libraryMongoose")();
const User = require("mongoose").model("Library");

module.exports = {
  saveToLibrary: function(req, res) {
    let userid = req.body.userid;
    let videoRecord = req.body.videoRecord;
    console.log("this is " + userid + " and their Video Record" + videoRecord);
    // User.findOne({ _id: userid })

    //   .then(dbModel => {
    //     console.log(dbModel);
    //     res.json(dbModel);
    //   });
  }
};
