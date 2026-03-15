const express  =require("express")
const cookieParser = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(cookieParser())


// all  routes required here 
const authRouter = require("./routes/auth.route")
const chatRouter = require("./routes/chat.route")



//  using Routes
app.use("/api/auth",authRouter)
app.use("/api/chat",chatRouter)

module.exports = app