import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import StarRating from "../StarRating/StarRating"; // Import the StarRating component
import logo from '../../assests/images/logo.png'; // Update the path to your logo image

const Navbar = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showStarRating, setShowStarRating] = useState(false);
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  const confirmLogout = () => {
    setShowStarRating(true); // Show the star rating when the user clicks "Logout"
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const completeLogout = () => {
    localStorage.clear();
    window.location = '/homepage';
  };

  const submitStarRating = () => {
    setShowLogoutConfirm(true); // Show the logout confirmation after submitting the star rating
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
              <NavLink to="/homepage" className="nav-link" activeClassName="active-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutus" className="nav-link" activeClassName="active-link">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contactus" className="nav-link" activeClassName="active-link">
                Contact Us
              </NavLink>
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

      {showStarRating && (
        <div className="star-rating-container">
          <h3>Please rate your experience before you leave:</h3>
          <StarRating />
          <button onClick={submitStarRating}>Submit Rating</button>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="logout-confirm">
          <p>Are you sure you want to logout?</p>
          <button onClick={completeLogout}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
