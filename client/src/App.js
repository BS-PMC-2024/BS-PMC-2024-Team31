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
import Profile from './components/Profile/Profile'; // Import the Profile component
import EditUsername from './components/EditUsername/EditUsername'; // استيراد مكون تحرير اسم المستخدم




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
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/' exact element={<Login />} />
        <Route path="/edit-profile" element={<Edit />} /> {/* Ensure this route exists */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/homePageStudent' exact element={<HomePageStudent />} /> {/* Add new route */}
        <Route path='/homePageWorker' exact element={<HomePageWorker />} /> {/* Add new route */}
        <Route path="/profile" element={<Profile />} /> {/* Ensure this route exists */}
        <Route path="/edit-username" exact element={<EditUsername />} /> {/* مسار جديد لتحرير اسم المستخدم */}


        <Route path='/' element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
