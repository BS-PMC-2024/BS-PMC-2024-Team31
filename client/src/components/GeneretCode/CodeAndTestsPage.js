import React from 'react';
import { useLocation } from 'react-router-dom';
import './CodeAndTestsPage.css'; // 
const CodeAndTestsPage = () => {
  const location = useLocation();
  const { code, generatedTests } = location.state || { code: '', generatedTests: [] };
  return (
    <div className="container">
      <h2 className="page-title">Code and Generated Unit Tests</h2>
      <div className="code-frame">
        <h3>Code:</h3>
        <pre className="code-content">{code}</pre>
      </div>
      <div className="tests-frame">
        <h3>Generated Unit Tests:</h3>
        <ul className="tests-list">
          {generatedTests.map((test, index) => (
            <li key={index} className="test-item">{test}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default CodeAndTestsPage;