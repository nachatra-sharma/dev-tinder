const User = require("../models/user-models");
const bcrypt = require("bcrypt");
const {
  updateUserSchema,
  updatePasswordSchema,
} = require("../utils/validator-script");
const { update } = require("../repository/user-repository");

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
  getProfile,
  editProfile,
  editPassword,
};
