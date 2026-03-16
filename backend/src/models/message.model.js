const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    },
    role:{
        type:String,
        enum: ["user" , "model"],
        default:"user"
    },
    content:{
        type:String,
        required:true
    }



},{
    timestamps:true
})


module.exports = mongoose.model("Message",messageSchema)