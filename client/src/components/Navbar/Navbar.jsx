import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import StarRating from "../StarRating/StarRating";
import logo from '../../assests/images/logo.png';
import AccessibilityMenu from "./AccessibilityMenu";

const Navbar = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showStarRating, setShowStarRating] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userFirstName, setUserFirstName] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Update the login status based on localStorage
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserFirstName(user.firstName);
      }
    };

    handleStorageChange(); // Check the initial state

    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const confirmLogout = () => {
    setShowStarRating(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const completeLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowLogoutConfirm(false); // Hide confirmation message
    navigate('/homepage');
  };

  const submitStarRating = () => {
    setShowStarRating(false);
    setShowLogoutConfirm(true);
  };

  const toggleAccessibilityMenu = () => {
    setShowAccessibilityMenu(prev => !prev);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev);
  };

  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="logo-container">
            <NavLink to="/" end>
              <img src={logo} alt="Logo" className="logo" />
            </NavLink>
            {isLoggedIn && (
              <div className="profile-container">
                <img
                  src={generateProfileImageURL(userFirstName)}
                  alt="Profile"
                  className="profile-image"
                  onClick={toggleProfileMenu}
                />
                {showProfileMenu && (
                  <div className="profile-menu">
                    <NavLink to="/edit-profile" className="profile-menu-item">
                      Edit Profile
                    </NavLink>
                    <NavLink to="/profile" className="profile-menu-item">
                      View Profile
                    </NavLink>
                  </div>
                )}
                <span className="welcome-message">Welcome, {userFirstName}!</span>
              </div>
            )}
          </div>

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
            {!isLoggedIn ? (
              <li>
                <NavLink to="/login" className="white_btn" data-testid="Login-button">
                  Login
                </NavLink>
              </li>
            ) : (
              <li>
                <button
                  className="white_btn"
                  onClick={confirmLogout}
                  data-testid="Logout-button"
                >
                  Logout
                </button>
              </li>
            )}
            <li>
              <button
                className="white_btn"
                onClick={toggleAccessibilityMenu}
                data-testid="Accessibility-button"
              >
                Accessibility
              </button>
            </li>
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

      {showAccessibilityMenu && (
        <AccessibilityMenu onClose={toggleAccessibilityMenu} />
      )}
    </>
  );
};

// Function to generate profile image URL
const generateProfileImageURL = (firstName) => {
  const firstLetter = firstName ? firstName[0].toUpperCase() : 'U'; // Default to 'U' if name is not available
  return `https://via.placeholder.com/100x100.png?text=${firstLetter}`;
};

export default Navbar;
