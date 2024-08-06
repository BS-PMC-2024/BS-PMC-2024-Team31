import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import NavigateButton from './NavigateButton';
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import Signup from './components/Singup';
import HomePageStudent from './components/HomePageStudent'; // Import new component
import HomePageWorker from './components/HomePageWorker'; // Import new component
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Edit from './components/Edit/EditProfile'; // Import the Edit component
import HomePageAdmin from './components/HomePageAdmin';
function App() {
  const handleLogout = () => {
    localStorage.clear();
    window.location = '/';
  }

  const navigateLogin = () => {
    window.location = '/login';
  };

  return (
    <BrowserRouter>
      <NavigateButton />
      <Navbar handleLogout={handleLogout} navigateLogin={navigateLogin} />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/edit-profile' element={<Edit />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/homePageStudent' element={<HomePageStudent />} />
        <Route path='/homePageWorker' element={<HomePageWorker />} />
        <Route path='/homepageadmin' element={<HomePageAdmin />} />
        <Route path='/' element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;