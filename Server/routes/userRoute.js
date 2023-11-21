const express = require("express");
const { registerUser, getUsers, deleteUser } = require("../controllers/userController");
const router = express.Router();

const app = express()

app.use(express.json())

router.post("/deleteuser",deleteUser);
router.get("/getusers",getUsers);
router.post("/register", registerUser);

module.exports = router;