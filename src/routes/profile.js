const express = require("express");

const cookieParser = require("cookie-parser");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { userauth } = require("../middleware/auth");

const profileRouter = express.Router();

profileRouter.use(express.json());
profileRouter.use(cookieParser());

//profile API
profileRouter.get("/profile", userauth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("cant get user profile");
  }

  // const {_id} = decodedToken;
  // console.log("id is:", _id);

  // res.send("Reading cookies and token is working fine");
});

//profile update API

profileRouter.patch("/profile/edit", userauth, async (req, res) => {
  try {
    const user = req.user;
    const { firstName, lastName, about } = req.body;
    if (firstName) {
      user.firstName = firstName;
    } if (lastName) {
      user.lastName = lastName;
    } if (about) {
      user.about = about;
    } await user.save();
    res.send("user profile updated successfully");  
  } catch (err) {
    res.status(400).send("cant update user profile");
  }
});

// profile delete API
// profileRouter.delete("/profile/delete"), userauth, async (req, res) => {
//   try {
//     const user = req.user;    
//     await User.findByIdAndDelete(user._id);
//     res.send("user profile deleted successfully");  
//   } catch (err) {
//     res.status(400).send("cant delete user profile");
//   } 
// }


module.exports = profileRouter;
