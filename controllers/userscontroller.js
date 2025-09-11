const User = require("../models/users")
const Getallusers=async(req,res)=>{

    const users=User.find()
    if (!users) return res.status(200).send("there is no users here")
    return res.status(200).json(users)
}
const DeleteUser=async(req,res)=>{
    let id=req.params.id
    if(!id)return res.status(400).send("id is required")
        let user=await User.findOne({id})
    if(!user) return res.status(404).send("user not found")
        await User.deleteOne(user)
    let users=await User.find()
    return res.status(200).json({message:"user  deleted successfully!!",users})
}

module.exports={Getallusers,DeleteUser}