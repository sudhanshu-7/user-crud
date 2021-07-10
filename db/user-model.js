const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({

    username :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    }



})
// "username"
// "phone" 
// "city"
// "state"
// "country"
// "area"
module.exports = mongoose.model("usercrud",UserSchema)