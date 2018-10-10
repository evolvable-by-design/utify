var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// module.exports = function() {
var LibrarySchema = new Schema({
  userid: {
    type: String
  },
  videoId: {
    type: String
  },
  thumbnailUrl: {
    type: String
  },
  channelTitle: {
    type: String
  },
  title: {
    type: String
  }
});

const LibraryItem = mongoose.model("LibraryItem", LibrarySchema);

module.exports = LibraryItem;
