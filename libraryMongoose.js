"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// module.exports = function() {
var LibrarySchema = new Schema({
  userid: {
    type: String
  },
  vedioId: {
    type: String
  },
  thumbnailUrl: {
    type: String
  }
});

LibrarySchema.set("toJSON", { getters: true, virtuals: true });

const Library = mongoose.model("Library", LibrarySchema);
// return User;
module.exports = Library;
// };
