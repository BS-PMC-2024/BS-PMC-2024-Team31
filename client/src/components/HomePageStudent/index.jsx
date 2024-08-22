import React, { useState } from 'react';
import styles from './styles.module.css'; // Import CSS module

function Home() {
  const [language, setLanguage] = useState('');
  const [testType, setTestType] = useState('');

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };

  const handleTestTypeChange = (event) => {
    const selectedTestType = event.target.value;
    setTestType(selectedTestType);
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
        </div>
      </div>
    </div>
  );
}

export default Home;
