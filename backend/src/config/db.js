const mongoose = require("mongoose")


async function ConnectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to MongoDB")
    } catch (error) {
        throw new Error("error to coonecting database" + error.message)
    } 
}


module.exports = ConnectToDb