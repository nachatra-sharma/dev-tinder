const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const profileRouter = require("./profile");
const connectionRouter = require("./connection");
const userRouter = require("./user");

router.use("/v1", authRouter);
router.use("/v1", profileRouter);
router.use("/v1", connectionRouter);
router.use("/v1", userRouter);

module.exports = router;
