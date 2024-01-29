const express = require("express");
const {
  getLeaves,
  AddLeave,
  getLeavesBalance,
} = require("../controllers/leavesController");
const router = express.Router();

router.get("/getleaves", getLeaves);
router.post("/addleave", AddLeave);
router.post("/getleavebal", getLeavesBalance);

module.exports = router;
