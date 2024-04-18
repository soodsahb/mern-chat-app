import { createContext, useState, useEffect, useContext } from "react";
import {useAuthConext} from './AuthContext'
import io from "socket.io-client";

export const SocketContext=createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider=({children})=>{
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthConext();

   

    useEffect(()=>{
       if(authUser){
        const socket = io("http://localhost:5000", {
            query: {
                userId: authUser.user._id,
            },
        });
       
        setSocket(socket);

        // socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});
        return () => socket.close();
       }else {
        if (socket) {
            socket.close();
            setSocket(null);
        }
    }
    },[authUser])

    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
}