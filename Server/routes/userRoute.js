const express = require("express");
const {
  registerUser,
  getUsers,
  loginUser,
  deleteUser,
  loginStatus,
} = require("../controllers/userController");
const router = express.Router();

router.post("/deleteuser", deleteUser);
router.post("/login", loginUser);
router.get("/getusers", getUsers);
router.post("/register", registerUser);
router.get("/loggedin", loginStatus);

module.exports = router;
