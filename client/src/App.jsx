import { useState } from 'react'

import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

import './App.css'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Forgot from './components/Forgot';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import OtpForm from './components/OtpForm';


function App() {

  return (
    <>
<BrowserRouter>
<Routes>
   <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/otp-form/:email' element={<OtpForm />} />
          <Route path='/reset-password-form' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
