import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const protectRoute=async (req,res,next)=>{
    try {
        //we cannot direclty get this cookie we need to use cookie parser package
        const token=req.cookies.jwt;

        if(!token) return res.status(401).json({error:'token not found'});

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:'invalid token'});
        }

        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({error:'User not found'});
        }
         //now we identified which user is sending the message
        req.user=user;
        next();  //this calls next function in middleware
    } catch (error) {
        console.log('error in protectRoute',error);
        res.status(500).json({error:'Interval server error'});
    }
}

export default protectRoute;