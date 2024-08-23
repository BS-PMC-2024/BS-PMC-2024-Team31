import React, { useState } from 'react';
import styles from './styles.module.css'; // Import CSS module

function Home() {
  const [language, setLanguage] = useState('');
  const [testType, setTestType] = useState('');
  const [tooltip, setTooltip] = useState(''); // State to store the tooltip text

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTestTypeChange = (event) => {
    const selectedTestType = event.target.value;
    setTestType(selectedTestType);

    // Set appropriate tooltip based on selected test type
    switch (selectedTestType) {
      case 'unit-test':
        setTooltip('Unit Testing: Tests individual units or components of a software.');
        break;
      case 'functional-test':
        setTooltip('Functional Testing: Validates the software system against the functional requirements/specifications.');
        break;
      case 'regression-test':
        setTooltip('Regression Testing: Ensures that code changes have not adversely affected existing functionalities.');
        break;
      case 'performance-test':
        setTooltip('Performance Testing: Determines the speed, responsiveness, and stability of a software under a workload.');
        break;
      case 'integration-test':
        setTooltip('Integration Testing: Tests the interaction between integrated units or components.');
        break;
      default:
        setTooltip('');
        break;
    }
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
            <label htmlFor="test-type-select" className={styles.testTypeSelectLabel}>Choose Type:</label>
            <div className={styles.testTypeWithTooltip}>
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
              {tooltip && (
                <div className={styles.tooltip}>
                  {tooltip}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
