const  jwt = require("jsonwebtoken")

function generateToken(userId){
    try {
        const token = jwt.sign({id:userId}, process.env.JWT_SECRET,{expiresIn:"7d"})
    
        return token;

    } catch (error) {
        throw new Error("token generation failed")
    }
}










module.exports = {generateToken}