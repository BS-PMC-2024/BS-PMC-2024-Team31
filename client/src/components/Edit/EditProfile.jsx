import React, { useState } from 'react';
import './EditProfile.css'; // Ensure this CSS file contains the styles you need

function EditProfile({ user, onSave, onCancel }) {
  const [role, setRole] = useState(user.userType || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    
    onSave({ userType: role, password });
  };
  const handleForgotPassword = () => {
    // link for reset password 
    window.location.href = 'forgot-password';
  };

  return (
    <div className="edit-profile-frame">
      <div className="edit-profile-content">
        <button className="close-button" onClick={onCancel}>&times;</button>
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="worker">Worker</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleForgotPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default EditProfile;
