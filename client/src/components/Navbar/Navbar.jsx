import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import StarRating from "../StarRating/StarRating";
import logo from '../../assests/images/logo.png';
import AccessibilityMenu from "../Navbar/AccessibilityMenu";

const Navbar = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showStarRating, setShowStarRating] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Update the login status based on localStorage
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

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
    localStorage.removeItem("token");
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

export default Navbar;
