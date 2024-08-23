import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (token && userData) {
        setIsLoggedIn(true);
        setUserFirstName(userData.firstName);
      } else {
        setIsLoggedIn(false);
        setUserFirstName("");
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
    setShowLogoutConfirm(false);
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
            <img
              src={logo}
              alt="Logo"
              className="logo"
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            />
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
                    <button
                      className="profile-menu-item"
                      onClick={() => {
                        navigate('/edit-profile');
                        setShowProfileMenu(false);
                      }}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="profile-menu-item"
                      onClick={() => {
                        navigate('/profile');
                        setShowProfileMenu(false);
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                )}
                <span className="welcome-message">Welcome, {userFirstName}!</span>
              </div>
            )}
          </div>

          <ul className="navbar">
            <li>
              <button
                className="nav-link"
                onClick={() => navigate('/homepage')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="nav-link"
                onClick={() => navigate('/aboutus')}
              >
                About
              </button>
            </li>
            <li>
              <button
                className="nav-link"
                onClick={() => navigate('/contactus')}
              >
                Contact Us
              </button>
            </li>
            <li>
              {!isLoggedIn ? (
                <button
                  className="white_btn"
                  onClick={() => navigate('/login')}
                  data-testid="Login-button"
                >
                  Login
                </button>
              ) : (
                <button
                  className="white_btn"
                  onClick={confirmLogout}
                  data-testid="Logout-button"
                >
                  Logout
                </button>
              )}
            </li>
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

      {/* Star Rating & Logout Confirmation */}
      {showStarRating && (
        <div className="modal-overlay">
          <div className="star-rating-container">
            <h3>Please rate your experience before you leave:</h3>
            <StarRating />
            <div className="star-rating-buttons">
              <button className="submit-btn" onClick={submitStarRating}>
                Submit Rating
              </button>
              <button className="cancel-btn" onClick={() => setShowStarRating(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="logout-confirm">
            <p>Are you sure you want to logout?</p>
            <div className="logout-confirm-buttons">
              <button className="confirm-btn" onClick={completeLogout}>
                Yes
              </button>
              <button className="cancel-btn" onClick={cancelLogout}>
                No
              </button>
            </div>
          </div>
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
