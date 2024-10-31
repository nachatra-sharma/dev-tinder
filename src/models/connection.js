const mongoose = require("mongoose");
const connectionSchema = new mongoose.Schema({
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
    },
  },
});

const Connection = mongoose.model("Connection", connectionSchema);

module.exports = Connection;
