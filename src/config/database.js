const mongoose = require("mongoose");

async function connectTODB(url) {
  try {
    await mongoose.connect(url + "devTinder");
    console.log("connected with database successfully");
  } catch (error) {
    console.log("something went wrong while connecting with database", error.message);
  }
}

module.exports = connectTODB;
