const { Router } = require("express");

const User = require("../models/user");

const jwt =require('jsonwebtoken')
const router = Router();

const bcrypt = require("bcrypt");
router.post("/register", async (req, res) => {
  console.log("haiiiiiiiiiiiiii");
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;
console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashedPassowrd = await bcrypt.hash(password, salt);


  const record= await User.findOne({email:email})
  if(record){
    return res.status(400).send({
        message:"Email is already registered"
    })
  }else{

    const user = new User({
        name: name,
        email: email,
        password: hashedPassowrd,
      });
      const saveData = await user.save();

    //   JWT Token 


    const {_id}= await saveData.toJSON()
    
    const token=jwt.sign({
        _id:_id},
        "secret"
    )
    res.cookie("jwt",token,{
        httpOnly:true,
        amxAge:24*60*60*1000

    })
    res.send({
        message:"success"
    })
      // if (saveData) {
      //   res.json({
      //     id: saveData,
      //   });
      // }

   

    
}
})
  

router.post("/login", async (req, res) => {

  let email=req.body.email;
  let password=req.body.password;
  if(email&&password) {
    const cheakData=await User.findOne({email:email})
    console.log(cheakData);
    if(!cheakData){
      return res.status(400).send({
        message:"This eamil is not exist"
    })
    }else{
      console.log(cheakData.password);
      console.log("koiii");
      const passCheak =bcrypt.compare(password, cheakData.password, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
          console.log("pass");
          res.send({message:"success"})
        }
      });
    }
  }else{
    return res.status(400).send({
      message:"This eamil is not exist"
  })
  }

});

router.get("/user", async (req, res) => {
  res.send("User Data");
});

module.exports = router;

