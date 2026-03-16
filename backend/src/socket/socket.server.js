const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/token.utils");
const userModel = require("../models/user.model");
const generateResponse = require("../services/ai.service");
const messageModel = require("../models/message.model")




function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || " ");

    // console.log("socket connection cookies" , cookies)

    if (!cookies.token) {
      return next(new Error("Authentication error: No token provided"));
    }


    try {
      const decoded = verifyToken(cookies.token);
      const user = await userModel.findById(decoded.id);

      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication error: invalid token "));
    }
  });

  io.on("connection", (socket) => {
    // console.log("USer connected :" , socket.user)
    // console.log("New socket connection :" ,socket.id)


    //  parse our string which come to postman
    socket.on("user-message", async (messagePayload) => {
      const payload =
        typeof messagePayload === "string"
          ? JSON.parse(messagePayload)
          : messagePayload;

    //   console.log(payload.content);


    //    save user  message in model 
      await messageModel.create({
        chat: payload.chat,
        user:socket.user._id,
        content:payload.content,
        role:"user"
      })


      // chatHistory 
      const chatHistory = await messageModel.find({
        chat:payload.chat
      })



      try {

        const response = await generateResponse(payload.content ,chatHistory );


        //  save ai message in model 
        await messageModel.create({
            chat:payload.chat,
            user: socket.user._id ,
            content:response,
            role:"model"
        })




        socket.emit("ai-response", {
          content: response,
          chat: payload.chat,
        });
      } catch (error) {
        socket.emit("error", error.message);
      }
    });
  });
}

module.exports = initSocketServer;
