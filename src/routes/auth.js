const jwt = require("jsonwebtoken");
const { userauth } = require("../middleware/auth");
const express = require("express");
const authRouter = express.Router();
const cookieParser = require("cookie-parser");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const validateSignupData = require("../utils/validation");

authRouter.use(express.json());
authRouter.use(cookieParser());

//signup API
authRouter.post("/signup", async (req, res) => {
  // console.log("BODY:", req.body);
  try {
    //validaing the input data
    validateSignupData(req);
    const password = req.body.password;

    //encryptying the password
    const passwordHash = await bcrypt.hash(password, 12);

    // creating a new user and saving to the database
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user have added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Find the user by emailId
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Emailid is not found");
    }

    // Validate the password
    const isPasswordMatch = await user.validatePassword(password);

    if (isPasswordMatch) {
      // craete a JWT Token
      const token = await user.getJWT();
      // console.log(token);
      //Add the token to cookies  and send response to the user
      res.cookie("token", token);
      res.send("Login Successful");
    } else {
      throw new Error("Password is incorrect");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("unable to login");
  }
});

//logout API
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logout successful");
});

module.exports = authRouter;
