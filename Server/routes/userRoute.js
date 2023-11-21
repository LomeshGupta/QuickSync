const express = require("express");
const { registerUser, getUsers } = require("../controllers/userController");
const router = express.Router();

const app = express()

app.use(express.json())

router.get("/getusers",getUsers);
router.post("/register", registerUser);

module.exports = router;