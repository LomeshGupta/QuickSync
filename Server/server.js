const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const leavesRoute = require("./routes/leavesRoute");
const errorHandler = require("./Middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
};

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//routesmiddleware
app.use("/api/users", userRoute);
app.use("/api/leaves", leavesRoute);

//routes
app.get("/", (req, res) => {
  res.send("Home");
});

//error
app.use(errorHandler);


//connect to db and start server

mongoose
  .connect(process.env.MOGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
