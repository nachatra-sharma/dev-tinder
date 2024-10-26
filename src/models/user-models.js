const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 6,
    maxLength: 16,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 60,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "others"],
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender is not valid");
      }
    },
  },
  photoURL: {
    type: String,
    trim: true,
    default:
      "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
