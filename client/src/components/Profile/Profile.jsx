import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [showRoleConfirm, setShowRoleConfirm] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);
  const [roleChangeMessage, setRoleChangeMessage] = useState('');
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  if (!email) {
    console.error('No email found in localStorage');
    return <div>No email found. Please log in again.</div>;
  }

  const handleUsernameClick = () => {
    navigate('/edit-username');
  };

  const handleDeleteClick = () => {
    setShowReasonDropdown(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedReason) {
      alert('Please select a reason for deleting your account.');
      return;
    }

    try {
      const email = localStorage.getItem("email");
      if (!email) {
        console.error("No email found in localStorage");
        return;
      }

      const url = "http://localhost:3001/api/user/delete-account";
      await axios.post(url, { email, reason: selectedReason });

      alert('Wait, this operation takes time');
      navigate('/login');
    } catch (error) {
      console.error('Error during account deletion:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setShowReasonDropdown(false);
  };

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
  };

  const handleRoleChangeClick = () => {
    console.log('Role change button clicked'); // Debugging
    setShowRoleConfirm(true); // Show role change confirmation modal
  };
  const handleConfirmRoleChange = async () => {
    setRoleChangeMessage('Your request is being processed.');
    try {
      console.log('Sending role change request');
      const response = await axios.post("http://localhost:3001/api/user/change-role", { email,
        changeRole: true // Include the changeRole field set to true

       });
      console.log('Response:', response.data); // Log the response
      setRoleChangeMessage('Role change request received!');
    } catch (error) {
      console.error('Error during role change:', error);
      setRoleChangeMessage(`Failed to process your request. Error: ${error.response ? error.response.data : 'Unknown error'}`);
    } finally {
      setShowRoleConfirm(false);
    }
  };
  

  const handleCancelRoleChange = () => {
    setShowRoleConfirm(false);
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
          <button className="profile-button" onClick={handleDeleteClick}>Delete</button>
          <button className="profile-button" onClick={handleRoleChangeClick}>Change My Role</button>
        </div>
      </div>

      {showReasonDropdown && (
        <div className="reason-dropdown">
          <label htmlFor="reason">Why are you deleting your account?</label>
          <select id="reason" value={selectedReason} onChange={handleReasonChange}>
            <option value="">Select a reason</option>
            <option value="privacy">Privacy Concerns</option>
            <option value="not-using">No longer using the service</option>
            <option value="support">Lack of support</option>
            <option value="other">Other</option>
          </select>
          <button className="profile-button" onClick={() => setShowModal(true)}>Next</button>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete your account?</h3>
            <p>Reason: {selectedReason}</p>
            <button className="modal-button" onClick={handleConfirmDelete}>Yes</button>
            <button className="modal-button" onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      )}

      {showRoleConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to change your role to Worker?</h3>
            <button className="modal-button" onClick={handleConfirmRoleChange}>Yes</button>
            <button className="modal-button" onClick={handleCancelRoleChange}>No</button>
          </div>
        </div>
      )}

      {roleChangeMessage && (
        <div className="message">
          {roleChangeMessage}
        </div>
      )}
    </div>
  );
}

export default Profile;
