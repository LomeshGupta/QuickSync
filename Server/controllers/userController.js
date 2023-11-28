const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { json } = require("body-parser");
const bcrypt = require("bcryptjs");

//get all users----------------------------------------------

const getUsers = asyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const users = await User.find();
  res.status(200).json(users);
});

//delete one user------------------------------------------
const deleteUser = asyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { username } = req.body;
  if (!username) {
    res.status(400);
    throw new Error("Please enter all required fields.");
  }
  const users = await User.deleteOne({ username });
  res.status(200);
  res.send("deleted successfully");
});

//register user ---------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // console.log(JSON.stringify(req.body));
  const {
    username,
    fullname,
    email,
    password,
    designation,
    department,
    employed,
  } = req.body;
  //validations
  if (!username || !fullname || !email || !password) {
    res.status(400);
    throw new Error("Please enter all required fields.");
  }

  //check if username already exist

  const userexist = await User.findOne({ username });

  if (userexist) {
    res.status(400);
    throw new Error("Username already exist.");
  }
  //encryption
  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(password, salt);

  //create new user

  const user = await User.create({
    username,
    fullname,
    email,
    password: hashedpass,
    designation,
    department,
    employed,
  });
  if (user) {
    const {
      _id,
      username,
      fullname,
      email,
      password,
      designation,
      department,
      employed,
      photo,
      phone,
    } = user;
    res.status(201).json({
      _id,
      username,
      fullname,
      email,
      designation,
      department,
      employed,
      photo,
      phone,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  registerUser,
  getUsers,
  deleteUser,
};
