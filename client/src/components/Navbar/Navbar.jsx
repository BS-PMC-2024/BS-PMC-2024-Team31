import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from '../../assests/images/logo.png'; // Update the path to your logo image

const Navbar = ({ handleLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [userType, setUserType] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Fetch user data from localStorage or API
    const userTypeFromStorage = localStorage.getItem("userType") || "Guest";
    const isAdminFromStorage = JSON.parse(localStorage.getItem("isAdmin") || "false");

    setUserType(userTypeFromStorage);
    setIsAdmin(isAdminFromStorage);

    // Debug logging
    console.log("User Type:", userTypeFromStorage);
    console.log("Is Admin:", isAdminFromStorage);
  }, []);

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const performLogout = () => {
    localStorage.clear();
    window.location = '/login';
  };

  return (
    <>
      <nav className="navbar">
        <NavLink exact to="/" className="logo">
          <img src={logo} alt="Logo" />
        </NavLink>
        
        <ul className="nav-links">
          <li className="nav-item">
            <span className="welcome-text">
              Welcome, {isAdmin ? "Admin" : (userType === "Student" || userType === "Worker") ? userType : "Guest"}
            </span>
          </li>
          {localStorage.getItem("token") && (
            <>
              <li className="nav-item">
                <div 
                  className="settings-menu"
                  onMouseEnter={() => setShowSettingsMenu(true)}
                  onMouseLeave={() => setShowSettingsMenu(false)}
                >
                  <button className="settings-btn">Settings</button>
                  {showSettingsMenu && (
                    <div className="settings-dropdown">
                      <NavLink to="/edit-profile" className="dropdown-link">Edit Profile</NavLink>
                      <NavLink to="/delete-profile" className="dropdown-link">Delete Profile</NavLink>
                    </div>
                  )}
                </div>
              </li>
              <li className="nav-item">
                <button className="logout-btn" onClick={confirmLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
          {!localStorage.getItem("token") && (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {showLogoutConfirm && (
        <div className="logout-confirm">
          <p>Are you sure you want to logout?</p>
          <button onClick={performLogout} className="confirm-btn">Yes</button>
          <button onClick={cancelLogout} className="cancel-btn">No</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
