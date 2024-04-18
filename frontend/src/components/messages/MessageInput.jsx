import { BsSend } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";




const MessageInput = () => {

	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};
	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;

// const NoChatSelected = () => {
// 	// const { authUser } = useAuthContext();
// 	return (
// 		<div className='flex items-center justify-center w-full h-full'>
// 			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
// 				<p>Welcome 👋 John Doe ❄</p>
// 				<p>Select a chat to start messaging</p>
// 				<TiMessages className='text-3xl md:text-6xl text-center' />
// 			</div>
// 		</div>
// 	);
// };