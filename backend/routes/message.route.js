import express from 'express';

const router=express.Router();
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

//now lets create sendmessage route for sending message to user id

router.get('/:id',protectRoute,getMessages);

//now we will protect send message route and check if user is logged in

router.post('/send/:id',protectRoute,sendMessage);

export default router