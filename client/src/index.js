import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Add this if you have global styles

// Find the root element in your HTML
const rootElement = document.getElementById('root');

// Create a React root and render the App component
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// Learn more: https://bit.ly/CRA-vitals
