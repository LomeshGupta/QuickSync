const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { json } = require("body-parser");
const bcrypt = require("bcryptjs");


//get all users----------------------------------------------

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  });


  //delete one user------------------------------------------
  const deleteUser = asyncHandler(async (req, res) => {
    const { username } = req.body
    if (!username) {
        res.status(400)
        throw new Error("Please enter all required fields.");
      }
    const users = await User.deleteOne({username});
    res.status(200);
    res.send("Deleted Successflly");
  });


//register user ---------------------------------------------
const registerUser = asyncHandler( async(req, res) => {
    // console.log(JSON.stringify(req.body));
  const { username, fullname, email, password } = req.body
  //validations
  if (!username || !fullname || !email || !password) {
    res.status(400)
    throw new Error("Please enter all required fields.");
  }

  //check if username already exist

  const userexist = await User.findOne({ username });

  if (userexist) {
    res.status(400);
    throw new Error("Username already exist.");
  }
//encryption
const salt  = await bcrypt.genSalt(10)
const hashedpass = await bcrypt.hash(password, salt);

  //create new user
  
  const user = await User.create({
    username,
    fullname,
    email,
    password : hashedpass,
  });
  if (user) {
    const {
      _id,
      username,
      fullname,
      email,
      password,
      designation,
      photo,
      phone,
    } = user;
    res.status(201).json({
      _id,
      username,
      fullname,
      email,
      password,
      designation,
      photo,
      phone,
    });
  }
  else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  registerUser,
  getUsers,
  deleteUser
};
