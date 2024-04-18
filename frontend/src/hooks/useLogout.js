import React, { useState } from 'react'
import { useAuthConext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
 const[loading,setLoading]=useState(false);
 const{setAuthUser}=useAuthConext();

 const logout= async()=>{
     setLoading(true);
    try {
        const res=await fetch('/api/auth/logout',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            }
            
        })
        const data=await res.json();

        if(data.error){
            throw new Error(data.error);
        }

        localStorage.removeItem('chat-user');
        setAuthUser(null);
        toast.success('logged out');
        // window.location.href='/login';
    } catch (error) {
        toast.error(error.message);
        console.log(error);
    }finally{
        setLoading(false);
    }
 }

 return {loading,logout};
}

export default useLogout