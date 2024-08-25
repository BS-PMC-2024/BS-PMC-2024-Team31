import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function Home() {
  const [language, setLanguage] = useState('');
  const [testType, setTestType] = useState('');
  const [tooltip, setTooltip] = useState('');
  const [insertCode, setInsertCode] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTestTypeChange = (event) => {
    const selectedTestType = event.target.value;
    setTestType(selectedTestType);

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

  const handleToggleInsertCode = () => {
    setInsertCode(!insertCode);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleGenerateTests = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/unitTests/generateTests', {
        code,
        testType
      });

      navigate('/code-and-tests', { state: { code, generatedTests: response.data.tests } });
    } catch (error) {
      console.error('Failed to generate tests:', error.message);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <div className={styles.header}>
          <button onClick={handleToggleInsertCode} className={styles.insertCodeButton}>
            {insertCode ? 'Cancel Code Input' : 'Insert Code & Generate Tests'}
          </button>
        </div>

        <div className={styles.selectionsContainer}>
          <div className={styles.languageSelectContainer}>
            <label htmlFor="language-select" className={styles.languageSelectLabel}>Select a language:</label>
            <select
              id="language-select"
              className={styles.languageSelect}
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="">--Select Language--</option>
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
                <option value="">--Select Test Type--</option>
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

        {insertCode && (
          <div className={styles.codeInputContainer}>
            <textarea
              className={styles.codeInput}
              value={code}
              onChange={handleCodeChange}
              placeholder="Insert your code here"
            />
            <button onClick={handleGenerateTests} className={styles.generateTestsButton}>
              Generate Tests
            </button>
          </div>
        )}

        <div className={styles.generatedTests}>
          {/* Display generated tests here */}
        </div>
      </div>
    </div>
  );
}

export default Home;
