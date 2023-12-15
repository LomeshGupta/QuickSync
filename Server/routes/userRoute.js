const express = require("express");
const {
  registerUser,
  getUsers,
  loginUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/deleteuser", deleteUser);
router.post("/login", loginUser);
router.get("/getusers", getUsers);
router.post("/register", registerUser);

module.exports = router;
