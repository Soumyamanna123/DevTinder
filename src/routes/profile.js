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
    const allowedUpdates = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photourl",
      "about",
      "skills",
    ];

    const isValid = Object.keys(req.body).every((key) =>
      allowedUpdates.includes(key),
    );

    if (!isValid) {
      return res.status(400).send("Invalid updates");
    }

    const user = req.user;

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    await user.save();

    res.send(user);
  } catch (err) {
    res.status(400).send("Update failed");
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
