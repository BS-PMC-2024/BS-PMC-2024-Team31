import React, { useState } from 'react';
import './AccessibilityMenu.css'; // Ensure this file is created for styling

const AccessibilityMenu = ({ onClose }) => {
  const [fontSize, setFontSize] = useState('16px');
  const [contrast, setContrast] = useState('normal');

  const increaseFontSize = () => {
    setFontSize(prevSize => {
      const newSize = parseInt(prevSize) + 2 + 'px';
      document.body.style.fontSize = newSize;
      return newSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => {
      const newSize = Math.max(12, parseInt(prevSize) - 2) + 'px';
      document.body.style.fontSize = newSize;
      return newSize;
    });
  };

  const toggleContrast = () => {
    setContrast(prevContrast => {
      const newContrast = prevContrast === 'normal' ? 'high' : 'normal';
      document.body.style.filter = newContrast === 'high' ? 'contrast(1.5)' : 'none';
      return newContrast;
    });
  };

  return (
    <div className="accessibility-menu">
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <h3>Accessibility Options</h3>
      <button onClick={increaseFontSize}>Increase Font Size</button>
      <button onClick={decreaseFontSize}>Decrease Font Size</button>
      <button onClick={toggleContrast}>Toggle High Contrast</button>
    </div>
  );
};

export default AccessibilityMenu;
