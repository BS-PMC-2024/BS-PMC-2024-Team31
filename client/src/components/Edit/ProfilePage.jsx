import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; // Ensure this path is correct

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found');
      return;
    }
    
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    } else {
      setErrorMessage('No user data found');
    }
  }, []);

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const toggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev);
  };

  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="profile-header">User Details</h1>
        <img
          src={generateProfileImageURL(user.firstName)}
          alt="Profile"
          className="profile-image"
          onClick={toggleProfileMenu}
        />
        <div className="profile-details">
          <p><strong>Username:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

const generateProfileImageURL = (firstName) => {
  const firstLetter = firstName ? firstName[0].toUpperCase() : 'U'; // Default to 'U' if name is not available
  return `https://via.placeholder.com/200x200.png?text=${firstLetter}`; // Increase the size here
};

export default ProfilePage;
