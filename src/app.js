const express = require("express");
const { adminauth, userauth } = require("./middleware/auth");

const app = express();

app.use("/admin", adminauth);
// app.use("/user", userauth)

app.get("/user", userauth, (req, res) => {
  res.send("User Data Sent");
});
app.post("/user/login", (req, res) => {
  res.send("User Logged In");
});
app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.delete("/admin/deleteAllData", (req, res) => {
  res.send("Delete All Data");
});

app.listen(3000, () => {
  console.log("success");
});
