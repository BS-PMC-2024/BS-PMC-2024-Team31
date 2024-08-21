import React, { useState } from 'react';
import './StarRating.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showStarRating, setShowStarRating] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleRating = (value) => {
    setRating(value);
  };

  const completeLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowLogoutConfirm(false); // Hide confirmation message
    window.location.href = '/homepage'; // Redirect to homepage after logout
  };

  const getMessage = () => {
    if (rating >= 4) {
      return 'Thank you for your feedback! We are glad you like our website.';
    } else if (rating === 3) {
      return 'Thank you for your rating! We hope to improve your experience in the future.';
    } else if (rating >= 1) {
      return 'We are sorry that your experience was not satisfactory. We are working to improve the website.';
    } else {
      return '';
    }
  };

  const submitStarRating = () => {
    setShowStarRating(false);
    setShowLogoutConfirm(true);
  };

  return (
    <div>
      {showStarRating && (
        <div id="star-rating">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star ${rating > index ? 'selected' : ''}`}
              onClick={() => handleRating(index + 1)}
            >
              &#9733;
            </span>
          ))}
          <p id="rating-message">{getMessage()}</p>
          <button id="submit-button" onClick={submitStarRating}>
            Submit Rating
          </button>
        </div>
      )}

      {showLogoutConfirm && (
        <div id="logout-confirm">
          <p>Are you sure you want to log out?</p>
          <button className="modal-button" onClick={completeLogout}>Yes</button>
          <button className="modal-button" onClick={() => setShowLogoutConfirm(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default StarRating;
