import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      setEmail(userData.email);
    } else {
      setErrorMessage('User data not found. Please log in again.');
      setIsVisible(false);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/user/edit-profil', {
        email: email,
        password: password,
        newPassword: newPassword,
      });
  
      if (response.status === 200) {
        setSuccessMessage('Profile updated successfully');
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error updating profile:', error.response); // طباعة تفاصيل الخطأ
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Failed to update profile');
      } else {
        setErrorMessage('Failed to update profile');
      }
      setSuccessMessage('');
    }
  };
  

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="edit-profile-container">
      <button className="close-button" onClick={handleClose}>✕</button>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Current Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="password-container">
          <label>
            Current Password:
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="button"
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="password-container">
          <label>
            New Password:
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="button"
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="password-container">
          <label>
            Confirm New Password:
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Save Changes</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  ) : null;
};

export default EditProfile;
