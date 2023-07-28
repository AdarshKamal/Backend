import JWT from 'jsonwebtoken'
import userModel from "../models/userModel.js"

//protect routes on the basis of tokens

export  const requireSignIn = async(req,res,next)=>{
    try{
        const decode = JWT.verify(req.headers.authorization,
            process.env.JWT_SECRET);
    req.user = decode;
        next()
     }catch(error){
        console.log(error)
    }
};