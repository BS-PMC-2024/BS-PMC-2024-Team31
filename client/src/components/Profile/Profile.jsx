// Profile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();

  const handleUsernameClick = () => {
    navigate('/edit-username');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="header-left">
          <div className="dropdown">
            <button className="dropbtn">Setting</button>
            <div className="dropdown-content">
              <button onClick={() => navigate('/home')}>Home</button>
              <button onClick={() => navigate('/')}>Log Out</button>
            </div>
          </div>
        </div>
        <div className="header-right">
          <span>Edit Profile</span>
        </div>
      </div>
      <div className="profile-content">
        <h2>Edit Profile</h2>
        <div className="profile-buttons">
          <button className="profile-button" onClick={handleUsernameClick}>Username</button>
          <button className="profile-button">Change Password</button>
          <button className="profile-button">Delete</button>
          <button className="profile-button">Change My Role</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
