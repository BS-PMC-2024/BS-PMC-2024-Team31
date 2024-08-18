import React from 'react';
import { useLocation } from 'react-router-dom';

const CodeAndTestsPage = () => {
  const location = useLocation();
  const { code, generatedTests } = location.state || { code: '', generatedTests: [] };

  return (
    <div>
      <h2>Code and Generated Unit Tests</h2>
      <div>
        <h3>Code:</h3>
        <pre>{code}</pre>
      </div>
      <div>
        <h3>Generated Unit Tests:</h3>
        <ul>
          {generatedTests.map((test, index) => (
            <li key={index}>{test}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CodeAndTestsPage;
