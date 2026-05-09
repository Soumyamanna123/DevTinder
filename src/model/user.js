const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLenth: 4, maxLength: 50 },
  lastName: { type: String },
  emailId: {
    type: String,
    requireed: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(" Invalid Email address:" + value);
      }
    },
  },
  password: { type: String, required: true, minLenth: 8 },
  age: { type: String },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: `{VALUE} is not a valid gender`,
    },
  },
  photourl: { type: String, default: "" },
  skills: { type: [String] },
  about: { type: String, default: "Hello! Iam using this application." },
});


// Method to generate JWT token
userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return token;
};


// Method to validate the password
userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordMatch = await bcrypt.compare(password, passwordHash);
  return isPasswordMatch;
};

module.exports = mongoose.model("User", userSchema);
