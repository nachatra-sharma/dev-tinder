const User = require("../models/user-models");
const {
  getAll,
  get,
  create,
  destroy,
  update,
} = require("../repository/user-repository");

const {
  loginUserSchema,
  createUserSchema,
} = require("../utils/validator-script");

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
    const { firstName, lastName, email, password, age, gender, photoURL } =
      req.body;
    const isDataValid = createUserSchema.safeParse({
      firstName,
      email,
      password,
      age,
      gender,
    });
    console.log("hit");
    if (!isDataValid.success) {
      throw new Error("Invalid Credentials");
    } else {
      console.log(isDataValid.error);
    }

    const isAlreadyUser = await User.findOne({ email });
    if (isAlreadyUser) {
      throw new Error("User already exist.");
    }
    const user = await create({
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      photoURL,
    });
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
      error: { error },
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
    const user = await update(
      { _id: userID },
      {
        firstName,
        lastName,
        email,
        password,
        age,
        gender,
        photoURL,
      }
    );
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
    const user = await User.find({ email, password });
    console.log(user);
    if (user[0].email === email && user[0].password === password) {
      return res.status(200).json({
        success: true,
        message: "User has been successfully logged in",
        data: {},
        error: {},
      });
    } else {
      throw new Error("Invalid Credentials");
    }
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
