const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

const app = express()

app.use(express.json())

router.post("/register", registerUser);

module.exports = router;