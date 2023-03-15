const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.JWT_SECRET_KEY, { expiresIn: "3d"} )
} 

const login = async (req, res) =>{
    const {email, password} = req.body
    debugger

    console.log({email, password})
    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const signup = async  (req, res) =>{

    const {email, password} = req.body
    console.log(email, password)
    
    try{
        const user = await User.signup(email, password)
        const token = createToken(user._id) 
        res.status(200).json({token})
    }

    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { login, signup }

