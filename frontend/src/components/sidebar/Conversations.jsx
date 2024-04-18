
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

//we need all users except our own





const Conversations = () => {
	const{loading,conversations}=useGetConversations();
	console.log(conversations);
	const users=conversations.users;
	console.log(users);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{users?.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === users.length - 1}
				/>
			))}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;