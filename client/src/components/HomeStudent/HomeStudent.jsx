// Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './HomeStudent.css';

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEdit = () => {
    navigate('/edit-profile'); // Navigate to the edit profile page
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location = '/';
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-left">
          <div className="dropdown">
            <button className="dropbtn">Setting</button>
            <div className="dropdown-content">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </div>
        <div className="header-right">
          <span>Student</span>
        </div>
      </div>
      <div className="home-content">
        <h2>Select a Language</h2>
        <div className="buttons-container">
          <button className="home-button">Python</button>
          <button className="home-button">Java</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
