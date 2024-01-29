const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({
  userId: {
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
  },
});

const Leaves = mongoose.model("Leaves", leaveSchema);
module.exports = Leaves;
