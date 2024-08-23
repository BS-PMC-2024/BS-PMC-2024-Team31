import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for routing
import styles from './styles.module.css'; // Import CSS module

function HomePageStudent() {
  const [language, setLanguage] = useState('');
  const [testType, setTestType] = useState('');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTestTypeChange = (event) => {
    setTestType(event.target.value);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <div className={styles.selectionsContainer}>
          <div className={styles.languageSelectContainer}>
            <label htmlFor="language-select" className={styles.languageSelectLabel}>Select a language:</label>
            <select
              id="language-select"
              className={styles.languageSelect}
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="">--Please choose an option--</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>

          <div className={styles.testTypeSelectContainer}>
            <label htmlFor="test-type-select" className={styles.testTypeSelectLabel}>Choose Types:</label>
            <select
              id="test-type-select"
              className={styles.testTypeSelect}
              value={testType}
              onChange={handleTestTypeChange}
            >
              <option value="">--Please choose an option--</option>
              <option value="unit-test">Unit Test</option>
              <option value="functional-test">Functional Test</option>
              <option value="regression-test">Regression Test</option>
              <option value="performance-test">Performance Test</option>
              <option value="integration-test">Integration Test</option>
            </select>
          </div>

          <div className={styles.buttonContainer}>
            <NavLink to="/profile/edit" className={styles.editProfileButton}>
              Edit Profile
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageStudent;
