const express = require("express");
const { getLeaves, AddLeave } = require("../controllers/leavesController");
const router = express.Router();

// router.post("/login", applyLeave);
router.get("/getleaves", getLeaves);
router.post("/addleave", AddLeave);

module.exports = router;
