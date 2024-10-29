const User = require("../models/user-models");
const bcrypt = require("bcrypt");
const {
  getAll,
  get,
  create,
  destroy,
  update,
} = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWTSECRET;

const {
  loginUserSchema,
  createUserSchema,
  updateUserSchema,
  updatePasswordSchema,
} = require("../utils/validator-script");

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
    if (!isDataValid.success) {
      throw new Error("Invalid Credentials");
    }
    const isAlreadyUser = await User.findOne({ email });
    if (isAlreadyUser) {
      throw new Error("User already exist.");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      age,
      gender,
      photoURL,
    });
    const token = jwt.sign({ id: user._id }, JWTSECRET);
    res.cookie("token", token);
    return res.status(200).json({
      success: true,
      message: "user has been successfully created",
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
      message: "something went wrong while creating the users",
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

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("No user found");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid Credentials.");
    } else {
      const token = jwt.sign({ id: user._id }, JWTSECRET);
      res.cookie("token", token);
      return res.status(200).json({
        success: true,
        message: "User has been successfully logged in",
        data: {},
        error: {},
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "something went wrong while logging the users",
      data: {},
      error: error.message,
    });
  }
}

async function logoutUser(req, res) {
  res.cookie("token", null, {
    expire: new Date(0),
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "User has been successfully logged out",
    data: {},
    error: {},
  });
}

async function getProfile(req, res) {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      message: "user has been fetched successfully",
      data: { user },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "something went wrong while getting the user profile",
      data: {},
      error: error.message,
    });
  }
}

async function editProfile(req, res) {
  try {
    const data = req.body;
    const prevUser = req.user;
    const isDataValid = updateUserSchema.safeParse(data);
    if (!isDataValid.success) {
      throw new Error("Invalid inputs.");
    }
    Object.keys(data).forEach((key) => (prevUser[key] = data[key]));
    await prevUser.save();
    return res.status(200).json({
      success: true,
      message: "user has been updated successfully",
      data: { prevUser },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "something went wrong while updating the user profile",
      data: {},
      error: error.message,
    });
  }
}

async function editPassword(req, res) {
  try {
    const data = req.body;
    const loggedInUser = req.user;
    const isDataValid = updatePasswordSchema.safeParse(data);
    if (!isDataValid.success) {
      throw new Error("Password was not updated successfully");
    }
    const user = await User.findById(loggedInUser._id);

    const isPasswordValid = await bcrypt.compare(
      data.oldPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid User Password");
    }
    const newHashPassword = await bcrypt.hash(data.newPassword, 10);
    const updatedUser = await update(user._id, {
      password: newHashPassword,
    });
    return res.status(200).json({
      success: true,
      message: "user has been updated successfully",
      data: { updatedUser },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "something went wrong while updating the user password",
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
  createUser,
  loginUser,
  logoutUser,
  getProfile,
  editProfile,
  editPassword,
};
