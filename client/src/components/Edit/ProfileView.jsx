import React, { useState, useEffect } from 'react';
import './ProfileView.css';

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setErrorMessage('No token found');
        return;
      }
      
      try {
        const response = await fetch('http://localhost:3001/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setErrorMessage(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-view">
      <h1>Profile View</h1>
      <img src={user.profileImage} alt="Profile" className="profile-image" />
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add other profile fields as needed */}
    </div>
  );
};

export default ProfileView;
