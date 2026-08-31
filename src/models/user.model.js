const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    // how to write a custom message
    message: "Username must be unique",
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username must be at most 30 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    // Not valid
    // message: "Email must be unique",

    // regex for email validation
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is rrequired"],

    // Not valid again, and fun fact: AI made this mistake because I copied only this model part maybe
    // message: "Password is required",
    minlength: [6, "Password must be at least 6 characters long"],
  },
  // age: {
  //   type: Number,
  //   required: true,
  //   min: [0, "Age must be a positive number"],
  // },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "Gender must be male, female, or other",
    },
  },
  // Role of the user, default is "buyer". It can be "admin", "buyer" or "seller". So only three roles are allowed.
  role: {
    type: String,
    enum: {
      values: ["ADMIN", "BUYER", "SELLER"],
      message: "Role must be ADMIN, BUYER or SELLER",
    },
    default: "BUYER",
  },
  updateCount: { type: Number, default: 0 },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
