const Connection = require("../models/connection");
const User = require("../models/user-models");

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

async function getFeedData(req, res) {
  try {
    const removedUserList = [];
    // current logged in user
    const loggedInUser = req.user._id;

    removedUserList.push(loggedInUser.toString());
    // connected user
    let connectionList = await Connection.find({
      $or: [
        { toUserId: loggedInUser, status: "accepted" },
        { fromUserId: loggedInUser, status: "accepted" },
      ],
    });

    connectionList.map((connection) => {
      const id = connection.toUserId.equals(loggedInUser)
        ? connection.fromUserId
        : connection.toUserId;
      removedUserList.push(id.toString());
    });
    // requested user
    const requestList = await Connection.find({
      $or: [
        { toUserId: loggedInUser, status: "interested" },
        { fromUserId: loggedInUser, status: "interested" },
      ],
    });
    requestList.map((request) => {
      const id = request.toUserId.equals(loggedInUser)
        ? request.fromUserId
        : request.toUserId;
      removedUserList.push(id.toString());
    });
    // ignored user
    const ignoredList = await Connection.find({
      $or: [
        { toUserId: loggedInUser, status: "ignored" },
        { fromUserId: loggedInUser, status: "ignored" },
      ],
    });
    ignoredList.map((ignored) => {
      const id = ignored.toUserId.equals(loggedInUser)
        ? ignored.fromUserId
        : ignored.toUserId;
      removedUserList.push(id.toString());
    });
    const allUserList = await User.find({}).select("-email -password");
    const userList = allUserList.filter(
      (user) => !removedUserList.includes(user._id.toString())
    );

    return res.status(200).json({
      success: true,
      message: "Your need feed is successfully fetched.",
      data: { userList: userList },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "something went wrong while getting the feed.",
      data: {},
      error: error.message,
    });
  }
}

module.exports = {
  getAllConnection,
  getAllRequests,
  getFeedData,
};
