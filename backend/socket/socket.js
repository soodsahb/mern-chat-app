import { Server } from "socket.io";
import http from "http";
import express from "express";


//now we will implement socket for app

const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET','POST']
    }
});

const userSocketMap={};

export const getRecieverSocketId=(recieverId)=>{
    return userSocketMap[recieverId];
}

io.on('connection',(socket)=>{
    console.log('a user connected',socket.id);
    //we are sending this from frontend
    const userId=socket.handshake.query.userId;
    console.log(userId);

    if(userId!==undefined) userSocketMap[userId]=socket.id;

    //io.emit is used to send events to all connected clients

    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on('disconnect',()=>{
        console.log('user disconnected',socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})





export {app,io,server}