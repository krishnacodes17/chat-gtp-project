require("dotenv").config()
const { config } = require("dotenv")
const app = require("./src/app")
const ConnectToDb = require("./src/config/db")



const PORT = process.env.PORT || 5000
ConnectToDb()

app.listen(PORT,()=>{
    console.log(`server is running on port:  ${PORT}`)
})