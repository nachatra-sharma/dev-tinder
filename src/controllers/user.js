const Connection = require("../models/connection");

async function getAllConnection(req, res) {
  try {
    const loggedInUser = req.user._id;
    let connectionList = await Connection.find({
      $or: [
        {
          toUserId: loggedInUser,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoURL",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoURL",
      ]);

    connectionList = connectionList.map((connection) => {
      connectionList = connection.fromUserId._id.equals(loggedInUser)
        ? connection.toUserId
        : connection.fromUserId;
      return connectionList;
    });

    return res.status(200).json({
      success: true,
      message: `Successfully fetched all the connections.`,
      data: { connectionList },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "something went wrong while getting the connections.",
      data: {},
      error: error.message,
    });
  }
}

async function getAllRequests(req, res) {
  try {
    const loggedInUser = req.user._id;
    let requestList = await Connection.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoURL",
    ]);
    if (requestList.length === 0) {
      throw new Error("No Request Found");
    }
    requestList = requestList.map((request) => request.fromUserId);
    return res.status(200).json({
      success: true,
      message: `Successfully fetched all the connections.`,
      data: { requestList },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "something went wrong while getting the connections.",
      data: {},
      error: error.message,
    });
  }
}

module.exports = {
  getAllConnection,
  getAllRequests,
};
