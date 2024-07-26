import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from '../../assests/images/logo.png'; // Update the path to your logo image
const Navbar = ({ handleLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const isLoggedIn = localStorage.getItem("token") ? true : false;

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
      <nav>
        <NavLink exact to="/" activeClassName="active-link">
          <img src={logo} alt="Logo" width="150" height="90" />
        </NavLink>
        
        <div>
          <ul id="navbar">
            <li>
              <h1 exact to="/" activeClassName="active-link">Welcome</h1>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  className="white_btn"
                  onClick={confirmLogout}
                  data-testid="Logout-button"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <NavLink to="/login" className="white_btn" data-testid="Login-button">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {showLogoutConfirm && (
        <div className="logout-confirm">
          <p>Are you sure you want to logout?</p>
          <button onClick={performLogout}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
