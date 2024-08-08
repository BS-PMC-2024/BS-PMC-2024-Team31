import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Add this if you have global styles

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
