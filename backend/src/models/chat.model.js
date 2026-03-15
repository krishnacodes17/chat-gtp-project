const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        require:[true,"title is required"]
    },
    lastActivity:{
        type:Date,
        default:Date.now
    }
    
},{timestamps:true})


module.exports = mongoose.model("Chat" , chatSchema)