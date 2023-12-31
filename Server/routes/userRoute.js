const express = require("express");
const {
  registerUser,
  getUsers,
  loginUser,
  deleteUser,
  logout,
  loginStatus,
  changePassword,
  updateUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/deleteuser", deleteUser);
router.post("/login", loginUser);
router.get("/getusers", getUsers);
router.post("/register", registerUser);
router.get("/loggedin", loginStatus);
router.get("/logout", logout);
router.post("/changepass", changePassword);
router.post("/updateuser", updateUser);

module.exports = router;
