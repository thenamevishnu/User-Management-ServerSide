const ADB = require("../Model/adminModel")
const UDB = require("../Model/userModel")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try{
        const {token} = req.body
        const response = token ? JSON.parse(token) : null
        if(response){
            const auth = jwt.verify(response.token,process.env.jwt_key)
            const timeStamp = Math.floor(Date.now() / 1000);
            if(auth.exp < timeStamp){
                res.json({status:-1})
            }else{
                res.json({status:1})
            }
        }else{
            res.json({status:0})
        }
    }catch(error){
        console.log(error);
    }
}

const login = async (req, res, next) => {
    try{
        const adminData = req.body
        const getAdmin = await ADB.findOne({Username:adminData.Username,Password:adminData.Password})
        if(!getAdmin){
            res.json({exist:false,response:"Invalid Username/Password!"})
        }else{
            const maxAge = 60 * 60 * 24 * 3
            const token = jwt.sign({ sub : getAdmin._id } , process.env.jwt_key , {expiresIn:maxAge*1000})
            res.json({exist:true,loggedIn:true,admin:true,token,getAdmin})
        }
    }catch(error){
        console.log(error);
    }
}

const getUsers = async (req, res, next) =>{
    try{
        const response = await UDB.find()
        res.json({status:true,allUsers:response})
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    auth,login,getUsers
}