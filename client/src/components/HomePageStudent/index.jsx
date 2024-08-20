import React, { useState } from 'react';
import './HomeStudent.css';
import axios from 'axios'; // إضافة axios لإجراء طلبات HTTP

function Home() {
  const [language, setLanguage] = useState(''); // حالة لتخزين اللغة المحددة

  const handleEdit = () => {
    // الانتقال إلى صفحة التعديل
    window.location = '/profile';
  };

  const handleLogout = () => {
    // مسح بيانات المستخدم من localStorage وتسجيل الخروج
    localStorage.clear();
    window.location = '/';
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    // هنا يمكنك إضافة الكود لتحديث اللغة في قاعدة البيانات إذا لزم الأمر
    // axios.post('/api/updateLanguage', { language: selectedLanguage })
    //   .then(response => {
    //     console.log(response.data);
    //     window.location = '/UnitStudent';
    //   })
    //   .catch(error => {
    //     console.error('There was an error updating the language!', error);
    //   });
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
        <div className="language-select-container">
          <label htmlFor="language-select" className="language-select-label">Select a language:</label>
          <select
            id="language-select"
            className="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Home;
