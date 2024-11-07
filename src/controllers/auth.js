const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWTSECRET;
const {
  loginUserSchema,
  createUserSchema,
} = require("../utils/validator-script");
const User = require("../models/user-models");
const bcrypt = require("bcrypt");
const { create } = require("../repository/user-repository");

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
    const responseUser = {
      photoURL: user.photoURL,
      firstName: user.firstName,
    };
    if (!isValidPassword) {
      throw new Error("Invalid Credentials.");
    } else {
      const token = jwt.sign({ id: user._id }, JWTSECRET);
      res.cookie("token", token);
      return res.status(200).json({
        success: true,
        message: "User has been successfully logged in",
        data: { responseUser },
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
    const userPhotoURL = photoURL ? photoURL : undefined;
    const user = await create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      age,
      gender,
      photoURL: userPhotoURL,
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

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
