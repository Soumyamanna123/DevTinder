const express = require("express");

const app = express();

// app.get("/user/:userid", (req,res)=>{
//     console.log("user ID:", req.params)
//     res.send({firstname:"Soumuya", lastname:"Manna"})
// })

// app.post("/user",(req,res)=>{
//     res.send("Object saved to DB")
// })

// app.delete("/user",(req,res)=>{
//     res.send("ID Deleted")
// })

app.use(
  "/user",[
  (req, res, next) => {
       next();
    res.send("i am from handler one");
 
  }],
  (req, res) => {
    res.send("i am from handler two");
  }
);

app.use("/test", (req, res) => {
  res.send("Hello from the Server");
});

app.listen(3000, () => {
  console.log("success");
});
