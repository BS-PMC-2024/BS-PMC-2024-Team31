import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProfile.css';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch the current user's data and populate the state
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/get-profile');
        const { email, bio, profileImage } = response.data;
        setEmail(email);
        setBio(bio);
        if (profileImage) {
          setImagePreview(`http://localhost:3001/uploads/${profileImage}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('bio', bio);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    try {
      const response = await fetch('http://localhost:3001/api/update-profile', {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        setSuccessMessage('Profile updated successfully!');
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error updating profile.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error updating profile. Please try again later.');
      setSuccessMessage('');
    }
  };
  

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-form-container">
        <div className="left">
          <h1>Edit Profile</h1>
          
          {imagePreview && (
            <div className="profile-image-preview">
              <img src={imagePreview} alt="Profile Preview" />
            </div>
          )}
        </div>
        <div className="right">
          <form onSubmit={handleSubmit} className="form-container">
            <h1>Update Your Info</h1>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={bio}
                onChange={handleBioChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profileImage">Profile Image</label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="save-button">Save Changes</button>
          </form>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
