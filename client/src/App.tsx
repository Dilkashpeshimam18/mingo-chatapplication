import React from 'react';
import './App.css';
import Home from './components/HomePage/Home';
import { Route, Routes } from 'react-router-dom'
import Login from './components/LoginPage/Login';
import Register from './components/RegisterPage/Register';
// import * as io from 'socket.io-client'
import { io } from "socket.io-client"
export const socket = io('http://13.53.118.65:4000',{  
    withCredentials: true,
    transports: ['websocket', 'polling', 'flashsocket'] 
})

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>


  );
}

export default App;
