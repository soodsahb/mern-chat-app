import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthConext } from './context/AuthContext'

function App() {

  const{authUser}=useAuthConext();
  
  console.log(authUser);

  //now we check if user is authenticated

  return (
    <div className='p-4 flex justify-center items-center h-screen'>
     <Routes>
     <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
      <Route path='/login' element={authUser?<Navigate to={'/'}/>:<Login/>}/>
      <Route path='/signup' element={authUser?<Navigate to={'/'}/>:<SignUp/>}/>
     </Routes>
     <Toaster/>
    </div>)
}

export default App
