const { connection } = require("mongoose");
const Connection = require("../models/connection");
const User = require("../models/user-models");

async function sendConnection(req, res) {
  try {
    const toUserId = req.params.userId;
    const fromUserId = req.user._id;
    const status = req.params.status;
    if (!toUserId || !fromUserId || !status) {
      throw new Error("Invalid connection request.");
    }

    const isToUserValid = await User.findById(toUserId);
    if (!isToUserValid) {
      throw new Error("User ID is not valid.");
    }

    const alreadyRequested = await Connection.find({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (alreadyRequested.length !== 0) {
      throw new Error("Already requested.");
    }

    const connectionRequest = await Connection.create({
      toUserId,
      fromUserId,
      status,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully sent connection request.",
      data: { connectionRequest },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "something went wrong while sending the connection request.",
      data: {},
      error: error.message,
    });
  }
}

module.exports = { sendConnection };
