import mongoose from "mongoose";

const messageSchema= mongoose.Schema({
    //this sender id will be inside user model this is how we take refernce using ref we are sying user collection
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

const Message=mongoose.model("Message",messageSchema);

export default Message;