const asyncHandler = require("express-async-handler");
const Leave = require("../models/leaveModel");
const User = require("../models/userModel");
const { json } = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//get all leaves----------------------------------------------

const getLeaves = asyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const leave = await Leave.find();
  res.status(200).json(leave);
});

//delete one user------------------------------------------
const deleteLeave = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    res.status(400);
    throw new Error("Please enter all required fields.");
  }
  const users = await Leave.deleteOne({ _id });
  res.status(200);
  res.send("deleted successfully");
});

//register user ---------------------------------------------
const AddLeave = asyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // console.log(JSON.stringify(req.body));
  const { username, type, leaves, createdDate } = req.body;
  //validations
  if (!username || !type || !leaves || !createdDate) {
    res.status(400);
    throw new Error("Please enter all required fields.");
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  //create new leave

  const leave = await Leave.create({
    username,
    type,
    leaves,
    createdDate,
  });

  if (leave) {
    const { _id, username, type, leaves, createdDate, expired } = leave;
    res.status(201).json({
      _id,
      username,
      type,
      leaves,
      createdDate,
      expired,
    });
  } else {
    res.status(400);
    throw new Error("Invalid leave data");
  }
});

//get leave balance

const getLeavesBalance = asyncHandler(async (req, res) => {
  const { username, type } = req.body;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const leave = await Leave.find({ username, type });
  const sum = leave.reduce((acc, item) => acc + item.leaves, 0);
  res.status(200).json(sum);
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Validate Request
  if (!username || !password) {
    res.status(400);
    throw new Error("Please add username and password");
  }

  // Check if user exists
  const user = await User.findOne({ username });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //   Generate Token
  const token = generateToken(user._id);

  if (passwordIsCorrect) {
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
  }
  if (user && passwordIsCorrect) {
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
      address1,
      address2,
      city,
      state,
      pincode,
      insta,
      facebook,
      twitter,
      bio,
    } = user;
    res.status(200).json({
      _id,
      username,
      fullname,
      email,
      designation,
      department,
      employed,
      photo,
      phone,
      token,
      address1,
      address2,
      city,
      state,
      pincode,
      insta,
      facebook,
      twitter,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = await req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

// Logout User
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    const {
      username,
      fullname,
      email,
      designation,
      department,
      employed,
      photo,
      phone,
      address1,
      address2,
      city,
      state,
      pincode,
      insta,
      facebook,
      twitter,
      bio,
    } = user;
    user.username = req.body.username || username;
    user.fullname = req.body.fullname || fullname;
    user.phone = req.body.phone || phone;
    user.email = req.body.email || email;
    user.designation = req.body.designation || designation;
    user.department = req.body.department || department;
    user.employed = req.body.employed || employed;
    user.address1 = req.body.address1 || address1;
    user.address2 = req.body.address2 || address2;
    user.city = req.body.city || city;
    user.state = req.body.state || state;
    user.pincode = req.body.pincode || pincode;
    user.insta = req.body.insta || insta;
    user.facebook = req.body.facebook || facebook;
    user.twitter = req.body.twitter || twitter;
    user.bio = req.body.bio || bio;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//change password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password, _id } = req.body;
  const user = await User.findById(_id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    user.password = hashedpass;
    await user.save();
    res.status(200).json({ message: "Password has been changed successfully" });
  } else {
    res.status(400);
    throw new Error("Old password is does not match");
  }
});

module.exports = {
  AddLeave,
  getLeaves,
  getLeavesBalance,
  deleteLeave,
  logout,
  loginUser,
  loginStatus,
  updateUser,
  changePassword,
};
