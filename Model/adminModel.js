const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:[true,"Username is required!"],
        unique:true
    },
    Password:{
        type:String,
        required:[true,"Password is required!"]
    }
})

module.exports = mongoose.model("Admins",adminSchema)