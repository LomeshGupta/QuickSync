const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  type: {
    type: String,
    required: true,
  },
  leaves: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  expired: {
    type: Boolean,
    default: false,
  },
});

const Leaves = mongoose.model("Leaves", leaveSchema);
module.exports = Leaves;
