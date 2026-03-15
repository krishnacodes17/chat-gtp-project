const authServices = require("../services/auth.service")



//  register user
async function registerUserController(req,res) {
    try {
        const result = await authServices.registerUser(req.body)
        
        res.status(201).json({
            success:true,
            message:"user created successfully",
            user:result
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}


//  login user
async function loginUserController(req,res) {
    try {
        const result = await authServices.loginUser(req.body)

            res.cookie("token" , result.token,{
                httpOnly:true,
                secure:false,
                maxAge: 7 * 24 * 60 * 60 * 1000 
            })

        res.status(200).json({
            success:true,
            message:" user login successfully",
            user:{
                id:result.id,
                email:result.email,              
            }
        })

    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message

        })
    }
}

module.exports = {registerUserController,loginUserController}