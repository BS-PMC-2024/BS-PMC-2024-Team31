import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const HomePageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [deletedRequests, setDeletedRequests] = useState([]);
  const [error, setError] = useState('');
  const [view, setView] = useState('');
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate('/edit-profile');
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admins/all');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError('Failed to fetch admins');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admins/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    }
  };

  const fetchDeletedRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admins/deleted-requests');
      setDeletedRequests(response.data);
    } catch (error) {
      console.error('Error fetching deleted requests:', error);
      setError('Failed to fetch deleted requests');
    }
  };

  const handleViewChange = (view) => {
    setView(view);
    if (view === 'admins') fetchAdmins();
    else if (view === 'users') fetchUsers();
    else if (view === 'deleted') fetchDeletedRequests();
  };

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleViewChange('admins')}>Show Admins List</button>
        <button className={styles.button} onClick={() => handleViewChange('users')}>Show Users List</button>
        <button className={styles.button} onClick={() => handleViewChange('deleted')}>Show Deleted Requests</button>
        <button className={styles.button} onClick={handleEditProfileClick}>Edit Profile</button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {view === 'admins' && (
        <div className={styles.tableContainer}>
          <h2>Admins List</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.firstName}</td>
                  <td>{admin.lastName}</td>
                  <td>{admin.email}</td>
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

      {view === 'deleted' && (
        <div className={styles.tableContainer}>
          <h2>Deleted Requests</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {deletedRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.id}</td>
                  <td>{request.details}</td>
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
