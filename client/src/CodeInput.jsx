import React, { useState } from 'react';
import axios from 'axios';

const CodeInput = () => {
    const [code, setCode] = useState('');
    const [tests, setTests] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/generate-tests', { code });
            setTests(response.data.tests);
        } catch (error) {
            console.error('Error submitting code:', error);
        }
    };

    return (
        <div>
            <h2>Submit Code for Unit Testing</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows="10"
                    cols="50"
                    placeholder="Enter your code here"
                />
                <button type="submit">Generate Tests</button>
            </form>
            {tests && (
                <div>
                    <h3>Generated Unit Tests:</h3>
                    <pre>{tests}</pre>
                </div>
            )}
        </div>
    );
};

export default CodeInput;
