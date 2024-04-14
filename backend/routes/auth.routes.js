import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';

//get the router

const router=express.Router();

//initialize login with router and export router

router.post('/login',login)

//if call back functions are big than this file will look ugly too so callback functions will have different controller folder
router.post('/signup',register)
router.post('/logout',logout)

export default router