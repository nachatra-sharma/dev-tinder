const bcrypt = require("bcrypt");
const {
  getAll,
  get,
  destroy,
  update,
} = require("../repository/user-repository");

const { createUserSchema } = require("../utils/validator-script");

async function getAllUsers(req, res) {
  try {
    const users = await getAll();
    if (users.length === 0) {
      throw new Error("No user found.");
    }
    return res.status(200).json({
      success: true,
      message: "successfully got all the users",
      data: { users },
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong while getting all the users",
      data: {},
      error: error.message,
    });
  }
}

async function getUserByID(req, res) {
  try {
    const userID = req.params.userID;
    if (!userID) {
      throw new Error("User not found");
    }
    const user = await get(userID);
    if (user.length === 0) {
      throw new Error("Invalid User ID");
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
      error: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const userID = req.params.userID;
    if (!userID) {
      throw new Error("User ID is not valid.");
    }
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
      error: error.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const userID = req.body.userID;
    if (!userID) {
      throw new Error("User ID is not valid.");
    }

    const { firstName, lastName, email, password, age, gender, photoURL } =
      req.body;
    const isDataValid = createUserSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      photoURL,
    });
    if (!isDataValid.success) {
      throw new Error("Invalid Credentials");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await update(
      { _id: userID },
      {
        firstName,
        lastName,
        email,
        password: hashPassword,
        age,
        gender,
        photoURL,
      }
    );
    return res.status(200).json({
      success: true,
      message: "user has been updated successfully",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        photoURL: user.photoURL,
        gender: user.gender,
      },
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong while updating the users",
      data: {},
      error: error.message,
    });
  }
}

module.exports = {
  getAllUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
