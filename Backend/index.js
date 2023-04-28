const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes=require("./routes/route")
const app=express()
app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']

}))

app.use(cookieParser())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/userDo",{
    useNewUrlParser:true,
}).then(()=>{
console.log("Server Connetted");
app.use(routes)    


app.listen(5000,()=>{
    console.log("User do  is ready ");
        })
})


