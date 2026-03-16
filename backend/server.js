require("dotenv").config()
const { config } = require("dotenv")
const app = require("./src/app")
const ConnectToDb = require("./src/config/db")
const initSocketServer = require("./src/socket/socket.server")
const httpServer = require("http").createServer(app)


const PORT = process.env.PORT || 5000
ConnectToDb()
initSocketServer(httpServer)

httpServer.listen(PORT,()=>{
    console.log(`server is running on port:  ${PORT}`)
})