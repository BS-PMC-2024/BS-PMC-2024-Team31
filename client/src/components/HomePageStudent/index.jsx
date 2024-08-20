import React, { useState } from 'react';
import './HomeStudent.css';

function Home() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleEdit = () => {
    window.location = '/profile';
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location = '/';
  };

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-content">
          <div className="header-right">
            <span>Student</span>
          </div>
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
