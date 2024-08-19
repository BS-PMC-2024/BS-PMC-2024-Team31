import React, { useState } from 'react';
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
import Edit from './components/Edit/EditProfile';
import Profile from './components/Profile/Profile';
import EditUsername from './components/EditUsername/EditUsername';
import HomePageAdmin from './components/HomePageAdmin';
import HomePage from './components/HomePage/HomePage'; 



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    window.location = '/';
  }


/*  
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };*/

  return (
    <Router>
      <div className="App">
        <Navbar onLogout={handleLogout} /> {/* Navbar יהיה קבוע בכל הדפים */}
        <div className="content"> {/* הוסף קונטיינר לתוכן */}
          <Routes>
          <Route path="/aboutus" element={<AboutUs />} />

            <Route path="/homepage" element={<HomePage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/homePageWorker" element={<HomePageWorker />} />
            <Route path="/homePageAdmin" element={<HomePageAdmin />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate replace to="/homepage" />} /> {/* Redirect root to /homepage */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/homePageStudent" element={<HomePageStudent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
  
export default App;

