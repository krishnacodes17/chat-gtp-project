const User = require("../models/user.model")
const bcryptjs = require("bcryptjs")
const { generateToken } = require("../utils/token.utils")


//  register user
async function registerUser(userData) {
    const {email, password ,firstname , lastname} = userData

    if(!email || !password){
        throw new Error("all fields required")
    }

    const existingUser = await User.findOne({
        $or: [{email} , {password}]
    })

    if(existingUser){
        throw new Error("User already exists")
    }


    // hashed password 
    const hashedPasswod = await bcryptjs.hash(password , 10)

    const user =  new User({
        email,
        password:hashedPasswod,
        fullname:{
            firstname:firstname,
            lastname:lastname
        }
    })

    await user.save()


    return{
        id:user._id,
        email: user.email,
        fullname:{
            firstname: user.fullname.firstname,
            lastname:user.fullname.lastname
        }
    }

}


//  login user

async function loginUser(userData) {

    const {email , password} = userData

    if(!email || !password){
        throw new Error("all fields required ")
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        throw new Error("user not found")
    }

    const isPassword = await bcryptjs.compare(password , user.password)

    if(!isPassword){
        throw new Error("Invalid Password")
    }


    //  create token 
    const token = await generateToken(user._id)


    return{
        token: token,
        id:user._id,
        email:user.email,
        fullname:{
            firstname:user.fullname.firstname,
            lastname:user.fullname.lastname
        }
    }

}



module.exports ={registerUser , loginUser}