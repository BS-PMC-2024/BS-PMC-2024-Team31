
import React, { useState } from 'react';
import './StarRating.css';

const StarRating = () => {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
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

    return (
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
        </div>
    );
};

export default StarRating;
