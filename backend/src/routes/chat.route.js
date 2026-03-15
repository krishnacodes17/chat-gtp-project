const express = require("express")
const chatRouter = express.Router()


const authUserMiddleware = require("../middleware/auth.middelware")
const chatControllers = require("../controllers/chat.controller")
/**POST /api/chat */


chatRouter.post("/", authUserMiddleware.authUserMiddelware ,chatControllers.createChat )


module.exports = chatRouter