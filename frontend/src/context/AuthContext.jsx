import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthConext=()=>{
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  const [authUser,setAuthUser]=useState(JSON.parse(localStorage.getItem("chat-user"))||null);
  console.log(authUser);


  return <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>;
};
