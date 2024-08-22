import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css'; // Ensure the path is correct

const Edit = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm new password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get JWT token from localStorage

      const response = await axios.post(
        'http://localhost:3001/api/auth/change-password',
        {
          email,
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Include the JWT token here
          },
        }
      );

      console.log('Password changed successfully:', response.data.message);
      alert('Password changed successfully.');
    } catch (error) {
      console.error('Error:', error.response.data);
      alert('Error changing password: ' + error.response.data.message);
    }
  };

  return (
    <div className={styles['edit-profile-frame']}>
      <div className={styles['edit-profile-content']}>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>Old Password</label>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>New Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles['save-button']}>Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
