const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:[true,"Username is required!"],
        unique:true
    },
    Password:{
        type:String,
        required:[true,"Password is required!"]
    },
    Dp:{
        type:String
    }
})

module.exports = mongoose.model("users",userSchema)