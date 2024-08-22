import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        required
      />
      <button type="submit">Change Password</button>
    </form>
  );
};

export default Edit;
