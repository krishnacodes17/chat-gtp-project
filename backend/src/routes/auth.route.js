const express = require("express")
const authRouter = express.Router()


const authControllers = require("../controllers/auth.controller")



authRouter.post("/register",authControllers.registerUserController)
authRouter.post("/login",authControllers.loginUserController)


module.exports = authRouter