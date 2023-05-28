const express= require ('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRouter = require('./Routes/user')
const adminRouter = require('./Routes/admin')
const app=express()

app.listen(3001,()=>{
    console.log("connected 3001");
})

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))

mongoose.connect("mongodb://127.0.0.1:27017/user-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connect successfully");
}).catch((error) => {
    console.log(error.message)
})

app.use('/',userRouter)
app.use('/admin',adminRouter)