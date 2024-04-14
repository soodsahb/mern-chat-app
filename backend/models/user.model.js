import mongoose from "mongoose";

//creating user schema 

const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female']
    },
    profilePic:{
        type:String,
        default:''
    }
},{timestamps:true})

//now schema is ready create model

const User=mongoose.model('User',userSchema);

export default User;