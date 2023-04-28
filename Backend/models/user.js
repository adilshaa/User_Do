const mongoose=require('mongoose')

const UserData=mongoose.Schema({
    name:{
        type:String,
        require:true

    },
    email:{
        type:String,
        unique:true,
        require:true

    },
    password:{
        type:String,
        require:true

    },

})
module.exports =mongoose.model("user",UserData)