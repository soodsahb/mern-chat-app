import jwt from 'jsonwebtoken';

//lets create token and cookies

const generateTokenAndSetCookie = async(userId,res)=>{

    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
    })

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,//prevents xss attacks,
        sameSite:"strict"  ,
        secure: process.env.NODE_ENV !== "development",
        
    })
}

export default generateTokenAndSetCookie;