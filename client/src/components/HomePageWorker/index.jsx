import React, { useState } from 'react';
import axios from 'axios';
import './HomeWorker.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function HomeWorker() {
  const [showTable, setShowTable] = useState(false);
  const [unitTestData, setUnitTestData] = useState({
    type: '',
    language: '',
    projectName: '',
    status: 'Pending',
    code: ''
  });
  const [unitTests, setUnitTests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedTests, setGeneratedTests] = useState([]);
  const [insertCode, setInsertCode] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUnitTestData({ ...unitTestData, [name]: value });
  };


  const handleAddUnitTest = () => {
    if (unitTestData.type && unitTestData.language && unitTestData.projectName) {
      setUnitTests([...unitTests, unitTestData]);
      setUnitTestData({ type: '', language: '', projectName: '', status: 'Pending', code: '' });
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
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        console.log('Failed to save unit tests:', response.data);
        setErrorMessage('Failed to save unit tests');
      }
    } catch (error) {
      console.error('Save all error:', error.response ? error.response.data : error.message);
      setErrorMessage(error.message);
    }
  };

  const handleGenerateTests = async () => {
      // Check if code is empty
  if (!unitTestData.code.trim()) {
    setErrorMessage('Please insert code before generating tests.');
    setTimeout(() => setErrorMessage(''), 3000); // Clear the error message after 3 seconds
    return;
  }

    try {
      const response = await axios.post('http://localhost:3001/api/unitTests/generateTests', {
        code: unitTestData.code
      });
      const generatedTests = response.data.tests || [];
      console.log('Generated tests:',generatedTests);
      setGeneratedTests(generatedTests);

      // Navigate to the new page with state containing the code and generated tests
      navigate('/code-and-tests', { state: { code: unitTestData.code, generatedTests: response.data.tests } });
    } catch (error) {
      console.error('Generate tests error:', error.response ? error.response.data : error.message);
      setErrorMessage('Failed to generate tests');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };
  const handleToggleInsertCode = () => {
    setInsertCode(!insertCode);
  };

  const markAsDone = (index) => {
    const updatedUnitTests = [...unitTests];
    updatedUnitTests[index].status = 'Done';
    setUnitTests(updatedUnitTests);
  };

  const handleToggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div className="home-worker">
      <header className="home-header">
        <div className="header-left">
          <button className="add-button" onClick={handleToggleTable}>
            {showTable ? 'Hide Table' : '+ New Test'}
          </button>
          <button className="insert-code-button" onClick={handleToggleInsertCode}>
            {insertCode ? 'Cancel Code Input' : 'Insert Code'}
          </button>
        </div>
        <div className="header-right">
          <span>Worker</span>
        </div>
      </header>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {insertCode && (
        <div className="code-input">
          <textarea
            name="code"
            placeholder="Insert your code here"
            value={unitTestData.code}
            onChange={handleInputChange}
          />
          <button className="generate-tests-button" onClick={handleGenerateTests}>Generate Tests</button>
        </div>
      )}

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

          {generatedTests.length > 0 && (
            <div className="generated-tests">
              <h3>Generated Unit Tests</h3>
              <ul>
                {generatedTests.map((test, index) => (
                  <li key={index}>{test}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomeWorker;
