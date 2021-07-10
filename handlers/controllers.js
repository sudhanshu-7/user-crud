const User = require("../db/user-model")
const { validationResult }= require("express-validator")


const getAllUsers = async (req,res,next)=>{
    let users
    try{
        users = await User.find()
    }catch(err){
        return next(err)
    }
    res.status(200).json({
        message:"success",
        data :users.map(user=> user.toObject({getters:true}))
    })
}
const editUser    = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const userData = req.body;
    let user
    try{
        user = await User.findById(userData.id)

    }catch(err){
        return next("Unable To Connect to DB")
    }
    if(!user){
        return next("not found")
    }
    user.username = userData.username
    user.phone = userData.phone
    user.city = userData.city
    user.state = userData.state
    user.country = userData.country
    user.area = userData.area
    try{
       await user.save()
    }catch(err){
        return next("Unable To Save")
    }
    res.status(200).json({
        message:"Updated Succesfully"
    })
}
const addUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    let check;
    try{
        check = await User.find({email:req.body.email})
    }catch(err){
        return next("Unable to Connect")
    }
    if(check && check.length !== 0){
        return next("Id Already Exist!")
    }
    const user = new User(req.body)
    try{
        await user.save()
    }catch(err){
        return next("Unable To Save")
    }
    res.status(200).json({
        message:"Success"
    })
}
const deleteUser  = async (req,res,next)=>{
    const id = req.body.id
    if(!id) return next("No ID Provided")
    let user
    try{
       user = await User.findById(id)
    }catch(err){
        return next("Cannot Connect to DB")
    }
    if(!user) return next("NO USER FOUND")
    try{
        await user.remove()
    }catch(err){
        return next("Cannot Find")
    }
    res.status(200).json({
        message:"Deleted ! "
    })
}

module.exports.getAllUsers =  getAllUsers 
module.exports.editUser =  editUser    
module.exports.addUser =  addUser     
module.exports.deleteUser =  deleteUser  