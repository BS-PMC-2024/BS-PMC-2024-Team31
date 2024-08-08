//component/homeworker.js
import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import axios from 'axios';
import './HomeWorker.css';
import EditProfile from '../Edit/EditProfile'; // Ensure this path is correct

const generateDefaultImageURL = (email) => {
  const firstLetter = email ? email[0].toUpperCase() : 'U'; // Default to 'U' if email is not available
  return `https://via.placeholder.com/100x100.png?text=${firstLetter}`;
};

function HomeWorker() {
  const [showTable, setShowTable] = useState(false);
  const [unitTestData, setUnitTestData] = useState({
    type: '',
    language: '',
    projectName: '',
    status: 'Pending'
  });
  const [unitTests, setUnitTests] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [user, setUser] = useState({ username: '', email: '', profileImage: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showProfileView, setShowProfileView] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setUser(data);
        } else {
          const text = await response.text();
          console.error('Expected JSON but got:', text);
          throw new Error('Expected JSON but got: ' + text);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUnitTestData({ ...unitTestData, [name]: value });
  };

  const handleAddUnitTest = () => {
    if (unitTestData.type && unitTestData.language && unitTestData.projectName) {
      setUnitTests([...unitTests, unitTestData]);
      setUnitTestData({ type: '', language: '', projectName: '', status: 'Pending' });
    } else {
      setErrorMessage('Please fill out all fields.');
    }
  };
  const handleSaveAllUnitTests = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      const url = 'http://localhost:3001/api/unitTests/saveAll';
      const payload = { unitTests };
  
      console.log('Sending request with payload:', JSON.stringify(payload));
  
      const response = await axios.post(url, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        console.log('All unit tests saved successfully');
        setErrorMessage('All unit tests saved successfully');
      } else {
        console.log('Failed to save unit tests:', response.data);
        setErrorMessage('Failed to save unit tests');
      }
    } catch (error) {
      console.error('Save all error:', error.response ? error.response.data : error.message);
      setErrorMessage(error.message);
    }
  };
  
  const handleViewProfile = async (email) => {
    try {
      const token = localStorage.getItem('token');
      const url = `http://localhost:3001/api/user/profile/${email}`; // Using the defined endpoint
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token if authentication is needed
        },
      });
  
      if (response.status === 200) {
        const userProfile = response.data; // User profile data
  
        // Display user's first name and other details
        setUser({
          ...userProfile,
          profileImage: userProfile.profileImage || generateDefaultImageURL(userProfile.email),
        });
        setShowProfileView(true); // Show the profile view
      } else {
        console.log('Failed to fetch user profile:', response.data);
        setErrorMessage('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Fetch error:', error.response ? error.response.data : error.message);
      setErrorMessage(error.message);
    }
  };
  
  
  const markAsDone = (index) => {
    const updatedUnitTests = [...unitTests];
    updatedUnitTests[index].status = 'Done';
    setUnitTests(updatedUnitTests);
  };

  /*const handleEditProfileClick = () => {
    setShowEditProfile(true);
  };*/

  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
  };

  const handleToggleTable = () => {
    setShowTable(!showTable);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleLogout = () => {
    console.log('Logging out');
    window.location.href = '/login'; // Or use routing library
  };


  const handleSaveProfile = async (updatedData) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Profile updated:', data); // Log response
        setUser(data);
        setShowEditProfile(false);
      } else {
        const text = await response.text();
        console.error('Expected JSON but got:', text);
        throw new Error('Expected JSON but got: ' + text);
      }
    } catch (error) {
      console.error('Update error:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="home-worker">
      <header className="home-header">
        <div className="header-left">
          <div className="dropdown">
            <button
              className="dropdown-btn"
              onClick={toggleProfileMenu}
              aria-haspopup="true"
              aria-expanded={showProfileMenu}
            >
              <div className="profile-header">
                <img
                  src={user.profileImage || generateDefaultImageURL(user.email)}
                  alt="Profile"
                  className="profile-image"
                />
                <div className="profile-details">
                  <span className="profile-username">{user.username || 'Loading...'}</span>
                  <span className="profile-email">{user.email || 'Loading...'}</span>
                </div>
              </div>
            </button>

            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-info">
                  <img
                    src={user.profileImage || generateDefaultImageURL(user.email)}
                    alt="Profile"
                    className="profile-image"
                  />
                  <p><strong>{user.username || 'Loading...'}</strong></p>
                  <p>{user.email || 'Loading...'}</p>
                </div>
                <button onClick={handleViewProfile}>View Profile</button>
                <button onClick={handleEditProfile}>Edit Profile</button>
                {showEditProfile && (
                  <div className="overlay">
                    <div className="edit-profile-container">
                      <button className="close-button" onClick={handleCloseEditProfile}>
                        &times;
                      </button>
                      <EditProfile
                        user={user}
                        onSave={handleSaveProfile}
                        onCancel={handleCloseEditProfile}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon"><AiOutlineLogout size={24} /></span>
            Log Out
          </button>
          <button className="add-button" onClick={handleToggleTable}>
            {showTable ? 'Hide Table' : '+ New Test'}
          </button>
        </div>
        <div className="header-right">
          <span>Worker</span>
        </div>
      </header>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {showTable && (
        <div className="unit-test-form">
          <input
            type="text"
            name="type"
            placeholder="Unit Test Type"
            value={unitTestData.type}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={unitTestData.projectName}
            onChange={handleInputChange}
          />
          <select
            name="language"
            value={unitTestData.language}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Language</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            {/* Add more languages as needed */}
          </select>
          <button className="add-unit-test-button" onClick={handleAddUnitTest}>Add Unit Test</button>
          <form onSubmit={handleSaveAllUnitTests}>
            <button type="submit" className="save-all-button">Save All</button>
          </form>

          <table className="unit-test-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Project Name</th>
                <th>Language</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unitTests.map((unitTest, index) => (
                <tr key={index}>
                  <td>{unitTest.type}</td>
                  <td>{unitTest.projectName}</td>
                  <td>{unitTest.language}</td>
                  <td className={unitTest.status === 'Done' ? 'done' : ''}>
                    {unitTest.status}
                  </td>
                  <td>
                    {unitTest.status !== 'Done' && (
                      <button onClick={() => markAsDone(index)}>Mark as Done</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showEditProfile && (
        <EditProfile
          user={user}
          onSave={handleSaveProfile}
          onCancel={() => setShowEditProfile(false)}
        />
      )}

      {showProfileView && (
  <div className="profile-view">
    <button className="close-button" onClick={() => setShowProfileView(false)}>&times;</button>
    <h2>Profile Information</h2>
    <img
      src={user.profileImage || generateDefaultImageURL(user.email)}
      alt="Profile"
      className="profile-image"
    />
    <p><strong>Username:</strong> {user.username || 'Loading...'}</p>
    <p><strong>Email:</strong> {user.email || 'Loading...'}</p>
  </div>
)}
    </div>
  );
}

export default HomeWorker;
