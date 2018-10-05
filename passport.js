"use strict";

require("./mongoose")();
var passport = require("passport");

var User = require("mongoose").model("User");

var GoogleTokenStrategy = require("passport-google-token").Strategy;
var config = require("./config");

module.exports = function() {
  passport.serializeUser((user, done) => {
    done(err, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(err, user);
    });
  });

  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret
      },
      function(accessToken, refreshToken, profile, done) {
        User.upsertGoogleUser(accessToken, refreshToken, profile, function(
          err,
          user
        ) {
          return done(err, user);
        });
      }
    )
  );
};
