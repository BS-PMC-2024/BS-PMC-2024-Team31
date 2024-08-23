import React, { useState, useEffect } from 'react';
import axios from "axios";
import './styles.module.css'; // Ensure this path is correct
import styles from './styles.module.css'; // Import styles module

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (email) {
      const fetchUserProfile = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3001/api/user/email/${email}`);
          setUser(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [email]);

  const generateProfileImageURL = (firstName) => {
    const firstLetter = firstName ? firstName[0].toUpperCase() : 'U'; // Default to 'U' if name is not available
    return `https://via.placeholder.com/200x200.png?text=${firstLetter}`; // Increase the size here
  };

  return (
    <div className={styles.profileContainer}>
      {user ? (
        <div className={styles.profileHeader}>
          <h1>{user.firstName} {user.lastName}</h1>
          <img
            className={styles.profileImage}
            src={user.profileImage ? user.profileImage : generateProfileImageURL(user.firstName)}
            alt={`${user.firstName} profile`}
          />
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p className={styles.loadingMessage}>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
