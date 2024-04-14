import User from "../models/user.model.js";
import bcyrpt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";

// we will import user model to create users
export const login = async (req, res) =>{
  
    try {
        
        const{userName,password}=req.body;

        const user=await User.findOne({userName});

        const isPasswordCorrect= await bcyrpt.compare(password,user?.password||"");

        if(!user ||!isPasswordCorrect){
            return res.status(400).json({error:'Invalid username or password'});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            message:'User logged in successfully',
            user
        })

        
    } catch (error) {
        res.status(500).json({
            error:'login error'
        });
        console.error(error);
    }


}

export const register = async (req, res) =>{
    try {
        
        const{fullName,userName,password,confirmPassword,gender}=req.body;

        if(password!==confirmPassword){
            return res.status(400).json({error:'Passwords do not match'})
        }

        const user=await User.findOne({userName});

        if(user){
            return res.status(400).json({error:'User already exists'})
        }


        const boyPic=`https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlPic=`https://avatar.iran.liara.run/public/girl?username=${userName}`

        //lets hash passowrd first

        const salt=await bcyrpt.genSalt(10);
        const hashedPassword=await bcyrpt.hash(password,salt);
        
        
        const newUser =await User.create({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic:gender==='male'?boyPic:girlPic
        })

        //now save user

        if(newUser){
            //before saving we will generate token and set cookie
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                message:'User created successfully',
                user:newUser
            })
        }else{
            res.status(500).json({
                error:'Invalid user data'
            })
        }

        


    } catch (error) {
        res.status(500).json({
            error:error.message
        });
        console.error(error);
    }
}
export const logout = async (req, res) =>{
    //make cookie value zero
    try {
        res.cookie("jwt",'',{maxAge:0});
        res.status(200).json({
            message:'User logged out successfully'
        })
    } catch (error) {
        res.status(500).json({
            error:"logout error"
        });
        console.error(error);
    }
}