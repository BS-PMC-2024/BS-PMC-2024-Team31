import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import StarRating from '../StarRating/StarRating';
import logo from '../../assests/images/logo.png';
import AccessibilityMenu from './AccessibilityMenu';

const Navbar = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showStarRating, setShowStarRating] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userFirstName, setUserFirstName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');

    const fetchUserDetails = async () => {
      if (email) {
        try {
          const { data } = await axios.get(`http://localhost:3001/api/user/email/${email}`);
          setUserFirstName(data.firstName || '');
          setUserRole(data.userType || '');
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();

    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
      
      const user = localStorage.getItem('user');
      console.log('Stored user data:', user); // Check the data in the console
      try {
        const parsedUser = JSON.parse(user) || {};
        setUserFirstName(parsedUser.firstName || '');
        setUserRole(parsedUser.userType || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    };

    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);

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
  const handleEditProfileClick = () => {
    console.log('Navigating to /edit');
    navigate('/edit');
  };
  const handleHomeClick = () => {
    if (userRole === 'worker') {
      navigate('/homePageWorker');
    } else if (userRole === 'student') {
      navigate('/homePageStudent');
    } else if (userRole === '') {
      navigate('/homePageAdmin');
    } else {
      navigate('/homepage');
    }
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
              
              <NavLink to="/profile" className="profile-menu-item">
                      Edit Profile
                    </NavLink>
                    <NavLink to="/viewprofile" className="profile-menu-item">
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
              <button
              className="white_btn"
                  data-testid="HOME-button"
                onClick={handleHomeClick}
              >
                Home
              </button>
            </li>
            <li>
              <NavLink
                to="/aboutus"
                className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contactus"
                className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
              >
                Contact Us
              </NavLink>
            </li>
            {!isLoggedIn ? (
              <li>
                <NavLink
                  to="/login"
                  className="white_btn"
                  data-testid="Login-button"
                >
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
          <StarRating onSubmit={submitStarRating} />
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

const generateProfileImageURL = (firstName) => {
  const firstLetter = firstName ? firstName[0].toUpperCase() : 'U';
  return `https://via.placeholder.com/100x100.png?text=${firstLetter}`;
};

export default Navbar;