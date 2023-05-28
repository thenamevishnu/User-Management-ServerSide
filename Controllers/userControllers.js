const UDB = require("../Model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const login = async (req, res, next)=>{
    try{
        const userData = req.body
        const getUser = await UDB.findOne({Username:userData.Username})
        if(!getUser){
            res.json({exist:false,response:"Invalid Username/Password!"})
        }else{
            const is_true = await bcrypt.compare(userData.Password,getUser.Password)
            if(!is_true){
                res.json({exist:false,response:"Invalid Username/Password!"})
            }else{
                const maxAge = 60 * 60 * 24 * 3
                const token = jwt.sign({ sub : getUser._id } , process.env.jwt_key , {expiresIn:maxAge*1000})
                res.json({exist:true,loggedIn:true,token,getUser})
            }
        }
    }catch(error){
        console.log(error);
    }
}

const signup = async (req, res, next)=>{
    try{
        const userData = req.body
        const regex = new RegExp(userData.Username,'i')
        const result = await UDB.findOne({Username:{$regex:regex}})
        if(result){
            res.json({exist:true,created:false})
        }else{
            userData.Password = await bcrypt.hash(userData.Password,10)
            userData.Dp = 
            await UDB.insertMany([userData])
            res.json({exist:false,created:true})
        }
    }catch(error){
        console.log(error);
    }
}

const authentication = (req, res, next)=>{
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

const profile = async (req, res, next) => {
    try{
        const {id}=req.body
        console.log(req.file);
        const imgUrl=req.file.filename
        await UDB.updateOne({_id:id},{$set:{
            Dp:imgUrl
        }}).then(()=>{
            res.json({status:true,Dp:imgUrl})
        })
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    login,signup,authentication,profile
}