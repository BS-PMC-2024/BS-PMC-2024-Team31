import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Profile from './components/Edit/Profile'; 
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import Signup from './components/Singup';
import HomePageStudent from './components/HomePageStudent'; 
import HomePageWorker from './components/HomePageWorker'; 
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Edit from './components/Edit/EditProfile'; 
import EditUsername from './components/EditUsername/EditUsername';
import HomePageAdmin from './components/HomePageAdmin';
import AddAdmin from './components/AddAdmin'; 

function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  const navigateLogin = () => {
    // تنفيذ العملية المطلوبة
  };

  return (
    <Router>
      <Navbar handleLogout={handleLogout} navigateLogin={navigateLogin} />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path="/edit-profile" element={<Edit />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/homePageStudent' element={<HomePageStudent />} />
        <Route path='/homePageWorker' element={<HomePageWorker />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-username" element={<EditUsername />} />
        <Route path='/homepageadmin' element={<HomePageAdmin />} />
        <Route path="/addAdmin" element={<AddAdmin />} />
        <Route path='/' element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
