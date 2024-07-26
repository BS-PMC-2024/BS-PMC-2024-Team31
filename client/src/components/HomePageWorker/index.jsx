import React from 'react';
import './HomeWorker.css';

function Home() {
  const handleEdit = () => {
    alert("Edit button clicked");
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
          <span>WORKER</span>
        </div>
      </div>
      <div className="home-content">
        <div className="buttons-container">
          
          <button className="home-button">Add unit test</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
