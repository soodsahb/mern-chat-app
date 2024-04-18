import React, { useState } from 'react'
import { useAuthConext } from '../context/AuthContext';
import toast from 'react-hot-toast';
const useLogin = () => {
    const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthConext();

    const login=async (userName,password)=>{
        const success = handleInputErrors(userName, password);
		if (!success) return;
        setLoading(true);
        try {
            const res= await fetch('/api/auth/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    userName,
                    password
                })
            })

            const data=await res.json();

            if(data.error){
                throw new Error(res.error)
            }
              toast.success('Login Success');

            setAuthUser(data);
            localStorage.setItem('chat-user',JSON.stringify(data));
        } catch (error) {
           toast.error(error);
        }finally{
            setLoading(false);
        }
    }

    return {
        login,
        loading
    }
}

export default useLogin

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}