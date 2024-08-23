import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import Signup from './components/Singup';
import HomePageStudent from './components/HomePageStudent';
import HomePageWorker from './components/HomePageWorker';
import ContactUs from './components/Navbar/ContactUs'; // Adjust the import path as needed
import AboutUs from './components/Navbar/AboutUs'; 
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Edit from './components/Edit'; // Import your Edit component
import Profile from './components/Profile/Profile';
import HomePageAdmin from './components/HomePageAdmin';
import HomePage from './components/HomePage/HomePage'; 
import AddAdmin from './components/AddAdmin/'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userFirstName, setUserFirstName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUserFirstName(userData.firstName);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUserFirstName(userData.firstName);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserFirstName("");
    localStorage.clear();
    window.location = '/';
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userFirstName={userFirstName} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/homePageWorker" element={<HomePageWorker />} />
            <Route path="/homePageAdmin" element={<HomePageAdmin />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate replace to="/homepage" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/homePageStudent" element={<HomePageStudent />} />
            <Route path="/addAdmin" element={<AddAdmin />} />
            <Route path="/edit" element={<Edit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
