const path = require("path");
const router = require("express").Router();
var { generateToken, sendToken } = require("../utils/token.utils");
var passport = require("passport");
var config = require("../config");
var request = require("request");
require("../passport")();

// API Routes

router.route("/auth/google").post(
  passport.authenticate("google-token", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }
    req.auth = {
      id: req.user.id
    };

    next();
  },
  generateToken,
  sendToken
);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
