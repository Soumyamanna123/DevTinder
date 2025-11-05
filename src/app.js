const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Example 2",
    lastName: "Example Title",
  };

  const user = new User(userObj);
  await user.save();
  res.send("user added successfully")
});

connectDB()
  .then(() => {
    console.log("Connection Successful to Database");
    app.listen(3000, () => {
      console.log("Successfully run on port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });
