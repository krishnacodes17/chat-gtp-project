const chatModel = require("../models/chat.model")

async function createChat(userId , title){
    if(!userId || !title){
        throw new Error("userId and title is required")
    }

    const chat = await chatModel.create({
        user: userId,
        title:title,
        lastActivity: new Date()
    })


    await chat.save()

    return{
        id:chat._id,
        user:chat.user,
        title:chat.title,
        lastActivity:chat.lastActivity
    }

}




module.exports = {createChat}