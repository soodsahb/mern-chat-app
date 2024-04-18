import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthConext } from '../context/AuthContext';

const useSignUp = () => {
  const[loading,setLoading]=useState(false);
  const{authUser,setAuthUser}=useAuthConext();

  const signup=async({ fullName, username, password, confirmPassword, gender })=>{
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

        setLoading(true);
        console.log(username);

  try {
    const res=await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, userName:username, password, confirmPassword, gender })
    })

    const data =await res.json();
    if(data.error){
        throw new Error(data.error);
    }
    localStorage.setItem('chat-user',JSON.stringify(data));
    toast.success('Account created successfully');

    //we need to identify the current user

    setAuthUser(data);
    console.log(data);
  } catch (error) {
    toast.error(error.message);
  }finally{
    setLoading(false);
  }
  }

  

  return { signup, loading }
}

export default useSignUp


function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 8 characters");
		return false;
	}

	return true;
}