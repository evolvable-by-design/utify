require("../mongoose")();
const User = require("mongoose").model("User");

module.exports = {
  profile: function(req, res) {
    let userid = req.body.userid;
    console.log("this is " + userid + " to fetch profile");
    User.findOne({ _id: userid })
      //   .select("+googleProvider") This is being removed as we dont need to send toekn info back to client.
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      });
  }
};