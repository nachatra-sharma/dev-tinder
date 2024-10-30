const express = require("express");
const router = express.Router();
const apiRouter = require("./v1");

router.use("/api", apiRouter);

module.exports = router;
