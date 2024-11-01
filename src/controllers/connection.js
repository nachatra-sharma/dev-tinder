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

async function chooseConnection(req, res) {
  try {
    const fromUserId = req.user._id;
    const { requestId, status } = req.params;
    if (!fromUserId || !requestId || !status) {
      throw new Error("Invalid request.");
    }

    const isRequestIdValid = await Connection.find({
      _id: requestId,
      toUserId: fromUserId,
    });

    if (isRequestIdValid.length === 0) {
      throw new Error("requestId is not valid.");
    }
    const validStatus = ["accepted", "rejected"];
    if (!validStatus.includes(status)) {
      throw new Error("status is not valid");
    }
    if (validStatus.includes(isRequestIdValid[0].status)) {
      throw new Error("Already " + isRequestIdValid[0].status);
    }
    isRequestIdValid[0].status = status;
    await isRequestIdValid[0].save();
    return res.status(200).json({
      success: true,
      message: `Successfully ${status} the request.`,
      data: {},
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

module.exports = { sendConnection, chooseConnection };
