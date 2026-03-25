const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userauth } = require("../middleware/auth"); 
const requestRouter = express.Router();

requestRouter.use(express.json());
requestRouter.use(cookieParser());  

//send to connection request API

requestRouter.post("/sendConnetionRequest", userauth, async (req, res) => {
  try {

    res.send("connection request sent successfully");
  } catch (err) {
    res.status(400).send("cant send connection request");
  }
});


module.exports = {
  requestRouter,
};