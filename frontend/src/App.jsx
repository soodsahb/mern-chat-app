import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'

function App() {


  return (
    <div className='p-4 flex justify-center items-center h-screen'>
      <Home/>
    </div>)
}

export default App
