const mongoose = require("mongoose");
const connectionSchema = new mongoose.Schema({
  toUserId: {
    type: mongoose.Schema.Type.ObjectId,
    required: true,
  },
  fromUserId: {
    type: mongoose.Schema.Type.ObjectId,
    required: true,
  },
  status: {
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: "Status is invalid.",
    },
  },
});

const Connection = mongoose.model("Connection", connectionSchema);

module.exports = Connection;
