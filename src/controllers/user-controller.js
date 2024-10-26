const {
  getAll,
  get,
  create,
  destroy,
  update,
} = require("../repository/user-repository");

const { loginUserSchema } = require("../utils/validator-script");

async function getAllUsers(req, res) {
  try {
    const users = await getAll();
    if (users.length === 0) {
      throw new Error("something went wrong while getting all the users");
    }
    return res.status(200).json({
      success: true,
      message: "successfully got all the users",
      data: { users },
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong while getting all the users",
      data: {},
      error: { error },
    });
  }
}

async function getUserByID(req, res) {
  try {
    const userID = req.params;
    if (!userID) {
      throw new Error("something went wrong while getting the users");
    }
    const user = get(id);
    if (user.length === 0) {
      throw new Error("something went wrong while getting the users");
    }
    return res.status(200).json({
      success: true,
      message: "successfully got the user",
      data: { user },
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong while getting the users",
      data: {},
      error: { error },
    });
  }
}

async function createUser(req, res) {
  try {
    const data = req.body;
    const user = await create(data);
    return res.status(200).json({
      success: true,
      message: "user has been successfully created",
      data: { user },
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong while creating the users",
      data: {},
      error: { error },
    });
  }
}

async function deleteUser(req, res) {
  try {
    const userID = req.params.userID;
    const user = await destroy(userID);
    return res.status(200).json({
      success: true,
      message: "user has been deleted successfully",
      data: { user },
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong while deleting the users",
      data: {},
      error: { error },
    });
  }
}

async function updateUser(req, res) {
  try {
    const userID = req.body.userID;
    const data = req.body;
    const user = await update({ _id: userID }, data);
    return res.status(200).json({
      success: true,
      message: "user has been updated successfully",
      data: { user },
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong while updating the users",
      data: {},
      error: { error },
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Invalid Credentials.");
    }
    const isDataValid = loginUserSchema.safeParse({ email, password });

    if (!isDataValid.success) {
      throw new Error("Invalid Credentials.");
    }

    console.log(isDataValid);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "something went wrong while updating the users",
      data: {},
      error: { error },
    });
  }
}

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
};
