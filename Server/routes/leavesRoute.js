const express = require("express");
const {
  //   addLeave,
  //   applyLeave,
  getLeaves,
} = require("../controllers/leavesController");
const router = express.Router();

// router.post("/login", applyLeave);
router.get("/getusers", getLeaves);
// router.post("/register", addLeave);

module.exports = router;
