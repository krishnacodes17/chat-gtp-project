const chatServices = require("../services/chat.service")

async function createChat(req,res) {
    const {title} = req.body
    const result = await chatServices.createChat(req.user , title)

    res.status(201).json({
        success:true,
        message:"Chat ceated successfully",
        chat:{
            _id :result.id,
            title: result.title,
            lastActivity:result.lastActivity
        }
    })
}


module.exports = {createChat}