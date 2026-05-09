const express = require("express");
const userRouter = express.Router();
const cookieParser = require("cookie-parser");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { userauth } = require("../middleware/auth");

userRouter.use(express.json());
userRouter.use(cookieParser());

//get user pending connection requests API
userRouter.get("/user/requests", userauth, async (req, res) => {
  try {
    const LoggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: LoggedInUser._id,
    });
  } catch (err) {
    res.status(400).send("cant get user requests");
  }
});

//get user profile API
userRouter.get("/user/profile", userauth, async (req, res) => {
  try {
    const LoggedInUser = req.user;
    const userProfile = await User.findById(LoggedInUser._id).select(
      "-password -__v",
    );
    res.status(200).json(userProfile);
  } catch (err) {
    res.status(400).send("cant get user profile");
  }
});

module.exports = userRouter;
