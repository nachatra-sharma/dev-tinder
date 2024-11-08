const jwt = require("jsonwebtoken");
const User = require("../models/user-models");

async function authCheck(req, res, next) {
  try {
    const { token } = req.cookies;
    console.log(token);
    const verify = jwt.verify(token, process.env.JWTSECRET);
    if (!verify.id) {
      throw new Error("Invalid Token");
    }
    const user = await User.findById(verify.id).select("-password");
    if (!user) {
      throw new Error("Invalid Token");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Invalid Token",
      data: {},
      error: error.message,
    });
  }
}

module.exports = {
  authCheck,
};
