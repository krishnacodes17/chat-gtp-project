const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/token.utils");


async function authUserMiddelware(req,res,next) {
    const {token} = req.cookies;

    if(!token){
       return res.status(401).json({
            success:false,
            message:"token not found"
        })
    }


    try {
        const decode = verifyToken(token)

        const user = await userModel.findById(decode.id)

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }

}

module.exports = {authUserMiddelware}