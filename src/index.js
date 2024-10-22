const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const connectTODB = require("./config/database");

app.listen(PORT, async () => {
  await connectTODB(process.env.MONGODBURL);
  console.log("server is listening on PORT:", PORT);
});
