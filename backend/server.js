// const express= require('express');
// const dotenv= require('dotenv');

import express from "express"
import dotenv from 'dotenv'
import authRoutes from '../backend/routes/auth.routes.js'
import messageRoutes from '../backend/routes/message.route.js'
import userRoutes from '../backend/routes/users.routes.js'
import connectToMongoDb from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js"
import path from 'path'

dotenv.config();
//creating server with express


//listening server
app.use(express.json());
app.use(cookieParser());

//we cannot directly use env variable we need to use dotenv package
const PORT=process.env.PORT||5000;

const __dirname = path.resolve();

// we will be importing mongodb function from db and connect to database when server starts
//server is socket connection
server.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`server is running on port ${PORT}`);
});

//now we have to create a route

// app.get('/',function(req,res){
//     res.send('Hello World11');
// })

//whenever somone will visit url that starts with /api/auth we will call authRoutes to handle request

app.use('/api/auth',authRoutes);

//now will use another middleware for message routes

app.use('/api/messages',messageRoutes);

//now we will get user routes

app.use('/api/users',userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));


//with this we will run run fronted from server

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
// in order to extract information from req body we need to use express,json middleware


//so we can excess the cookies

//if we use to many routes file will look ugly and unmaintable so we will use middlewares

