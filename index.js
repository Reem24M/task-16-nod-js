const express=require('express');
require('dotenv').config()
const app=express();
const {connectDB}=require('./config/connectDb');
const { mongoose } = require('mongoose');
app.use(express.json());
const session=require('express-session')
const cors=require('cors')
app.set('json spaces',2)
connectDB();


const ips = ['http://127.0.0.1:3000', "http://localhost:3000", "http://127.0.0.1:5500"];
app.use(cors({
    origin: (ip, callback) => {
        try {
            console.log(ip);
            if (!ip || ips.includes(ip)) {
                callback(null, true);
            }
            else {
                callback("Not allowed by CORS");
            }
        }
        catch (error) {
            console.log(error);
        }

    }
}))

app.use(session({
    secret: process.env.SESSION_SECRET || "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60, httpOnly: true, secure: false }
}));


app.use('/auth',require('./Routes/authRouter'))
app.use('/orders',require('./Routes/orderRouter'))
app.get('/',(req,res)=>{
   return res.send("helo");
})
mongoose.connection.once('open',()=>{
    console.log("MongoDB connected");
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});

module.exports={app};