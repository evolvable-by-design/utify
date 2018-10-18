var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// module.exports = function() {
var ChipData = new Schema({ label: String });

var UserChipSchema = new Schema({
  userid: {
    type: String
  },
  chips: [ChipData]
});

const UserChip = mongoose.model("UserChip", UserChipSchema);

module.exports = UserChip;
