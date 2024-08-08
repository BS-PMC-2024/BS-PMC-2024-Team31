import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Profile from './components/Edit/Profile'; // 
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import Signup from './components/Singup';
import HomePageStudent from './components/HomePageStudent'; 
import HomePageWorker from './components/HomePageWorker'; 
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (

    <Router>
      <div className="App">
        {isLoggedIn && <Navbar onLogout={handleLogout} />}
        <Routes>

          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          <Route path="/homePageWorker" element={<HomePageWorker />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Login />} />
          <Route path="/profile" element={<Profile />} /> {/* استخدم مكون Profile هنا */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/homePageStudent' element={<HomePageStudent />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
