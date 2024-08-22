import React, { useState } from 'react';
import './styles.module.css';
import axios from 'axios'; // إضافة axios لإجراء طلبات HTTP

function Home() {
  const [language, setLanguage] = useState(''); // حالة لتخزين اللغة المحددة

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleEdit = () => {
    window.location = '/profile';
  };

  const handleLogout = () => {
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
      <div className="language-select-container">
        <label htmlFor="language-select" className="language-select-label">Select a language:</label>
         <div className="tooltip-wrapper">
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
    <span className="tooltiptext">Choose your preferred programming language</span>
  </div>
</div>

      </div>
    </div>
  );
}

export default Home;
