import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditUsername.css';

function EditUsername() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const email = localStorage.getItem('email'); // الحصول على البريد الإلكتروني من التخزين المحلي
  const [userId, setUserId] = useState(null); // حفظ معرف المستخدم

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/email/${email}`);
        console.log("Fetched user data:", response.data); // تسجيل بيانات المستخدم
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUserId(response.data._id); // تعيين معرف المستخدم
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [email]);

  const handleSave = async () => {
    try {
        await axios.put('/api/update-name', {
            userId: userId._id,
            firstName,
            lastName,
        });
        alert('Sussesful to fetch user data'); // Arabic success message
    } catch (error) {
        console.error('Error updating user information:', error);
        alert('Failed to fetch user data'); // Arabic failure message
    }
};


  return (
    <div className="container">
      <div className="form_container">
        <h1>Edit Username</h1>
        <input
          type="text"
          className="input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          className="input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <button onClick={handleSave} className="button">Save</button>
      </div>
    </div>
  );
}

export default EditUsername;
