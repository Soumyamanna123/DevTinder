const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");

const app = express();

app.use(express.json());

//signup API
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.send);
    await user.save();
    res.send("user have added successfully");
  } catch (err) {
    // res.status(500).send(err.message)
    res.status(400).send(err.message);
  }
});

// API - GET a user by email THE USERS FROM THE DATABASE

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const user = await User.find({ emailId: userEmail });
//     res.send(user)
//   } catch (err) {
//     res.status(400).send("cant get user");
//   }
// });

// API - GET a user by email THE USERS FROM THE DATABASE
// app.get("/user", async (req, res) => {
//   const userName = req.body.firstName;

//   try {
//     const user = await User.find({ firstName: userName });
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("could not find");
//   }
// });

// API - GET all users

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ });
    res.send(user);
  } catch (err) {
    res.status(400).send("cant get user");
  }
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
