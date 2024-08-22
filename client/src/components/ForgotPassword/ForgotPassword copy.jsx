import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [roleError, setRoleError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Reset error messages
    setPasswordError('');
    setRoleError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/forgot-password', {
        email,
        newPassword,
        role,
      });

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        // Separate the errors based on response data
        if (response.data.errorType === 'password') {
          setPasswordError('Error updating the password');
        } else if (response.data.errorType === 'role') {
          setRoleError('Error updating the role');
        }
      }
    } catch (error) {
      // General error handling
      setMessage('An error occurred while processing your request');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-content">
        <button className="close-button" onClick={() => console.log('Close')}>
          &times;
        </button>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Change Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select a role</option>
              <option value="worker">Worker</option>
              <option value="student">Student</option>
            </select>
          </div>
          <button type="submit" className="save-button">Update</button>
          {passwordError && <p className="error-message">{passwordError}</p>}
          {roleError && <p className="error-message">{roleError}</p>}
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
