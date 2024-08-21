import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const HomePageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [deletedRequests, setDeletedRequests] = useState([]);
  const [changeRoleUsers, setChangeRoleUsers] = useState([]);
  const [error, setError] = useState('');
  const [view, setView] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (view === 'admins') fetchAdmins();
    else if (view === 'users') fetchUsers();
    else if (view === 'changeRole') fetchChangeRoleUsers();
    else if (view === 'deleted') fetchDeletedRequests();
  }, [view]);

  const handleEditProfileClick = () => {
    navigate('/edit-profile');
  };

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/admins/all');
      setAdmins(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError('Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAdminClick = async (email) => {
    try {
      const response = await axios.post('http://localhost:3001/api/admins/remove', { email });
      if (response.status === 200) {
        setAdmins(admins.filter(admin => admin.email !== email));
      } else {
        setError('Failed to remove admin');
      }
    } catch (error) {
      setError('Failed to remove admin');
      console.error('Error removing admin:', error.response || error);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/admins/users');
      setUsers(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchChangeRoleUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/admins/changeRole-true');
      setChangeRoleUsers(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching users with changeRole true:', error);
      setError('Failed to fetch users with changeRole true');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeletedRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/admins/deleted-requests');
      setDeletedRequests(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching deleted requests:', error);
      setError('Failed to fetch deleted requests');
    } finally {
      setLoading(false);
    }
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleAddAdminClick = () => {
    navigate('/addAdmin'); // Navigate to the AddAdmin page
  };

  // Function to handle removal of users from changeRoleUsers table
  const handleMarkAsDoneClick = (email) => {
    setChangeRoleUsers(changeRoleUsers.filter(user => user.email !== email));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleViewChange('admins')}>Show Admins List</button>
        <button className={styles.button} onClick={() => handleViewChange('users')}>Show Users List</button>
        <button className={styles.button} onClick={() => handleViewChange('changeRole')}>Show Users with Change Role</button>
        <button className={styles.button} onClick={handleEditProfileClick}>Edit Profile</button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {loading && <div className={styles.loading}>Loading...</div>}

      {view === 'admins' && (
        <div className={styles.tableContainer}>
          <h2>Admins List</h2>
          <div className={styles.adminButtons}>
            <button className={styles.button} onClick={handleAddAdminClick}>Add Admin</button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.firstName}</td>
                  <td>{admin.lastName}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button 
                      className={styles.button} 
                      onClick={() => handleRemoveAdminClick(admin.email)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'users' && (
        <div className={styles.tableContainer}>
          <h2>Users List</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>User Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.userType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


    </div>
  );
};

export default HomePageAdmin;
