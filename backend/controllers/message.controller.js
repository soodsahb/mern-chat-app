import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    //now we will find Conversation between these two users
    //this is mongoose syntax
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      //if there is no conversation between these two users
      //we will create a new conversation between these two users
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({
      message: `message sent from ${senderId} to ${recieverId} and this was mee ${newMessage}`,
    });
  } catch (error) {
    console.log("error in send message", error);
    res.status(500).json({ error: "Interval server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");//this populate will return array of objects before this it was returning us array of id's now it will giving messages of those id

     if(!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("error in get messages", error);
    res.status(500).json({ error: "Interval server error" });
  }
};
