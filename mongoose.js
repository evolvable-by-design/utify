"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  fullName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  picture: {
    type: String
  },
  gender: {
    type: String
  },
  googleProvider: {
    type: {
      id: String,
      token: String,
      refreshToken: String
    },
    select: false
  }
});

UserSchema.set("toJSON", { getters: true, virtuals: true });

UserSchema.statics.upsertGoogleUser = function(
  accessToken,
  refreshToken,
  profile,
  cb
) {
  console.log(profile);
  var that = this;
  return this.findOne(
    {
      "googleProvider.id": profile.id
    },
    function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          picture: profile._json.picture,
          gender: profile._json.gender,
          googleProvider: {
            id: profile.id,
            token: accessToken,
            refreshToken: refreshToken
          }
        });

        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    }
  );
};

const User = mongoose.model("User", UserSchema);
module.exports = User;