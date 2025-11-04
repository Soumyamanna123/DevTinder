 const express = require('express') 


const app = express()

app.use("/hi",(req,res)=>{
    res.send("hello")
})

app.listen(3000, ()=>{
    console.log("success")
})



