import React from 'react'
import { useAuthConext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {
  //now we need to check if this message is from us or other user

  const {authUser}=useAuthConext();
  const {selectedConversation}=useConversation();
  const fromMe = message.senderId === authUser.user._id;
  console.log(message.senderId);
  console.log(authUser._id);
  console.log(fromMe);
  const chatClassName=fromMe?'chat-end':'chat-start';
  const profilePic = fromMe ? authUser.user.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  const formattedTime = extractTime(message.createdAt);
  return (
    <div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{formattedTime}</div>
		</div>
  )
}

export default Message