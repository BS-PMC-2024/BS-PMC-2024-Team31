// src/pages/AboutUs.js
import React from 'react';
import './AboutUs.css'; // Ensure you create and link this CSS file
const faqs = [
  { question: 'What is this website about?', answer: 'This website is a platform designed by students from SCE College to help other students and software professionals perform various types of unit tests for their code by AI in Java and Python.' },
  { question: 'How can I contact support?', answer: 'You can contact support through the "Contact Us" page where you will find the contact details of our support team.' },
  { question: 'How do I create an account?', answer: 'Click on the "Login" button at the top right corner and follow the instructions to register.' },
  { question: 'How do I reset my password?', answer: 'Go to the "Login" page and click on the "Forgot Password" link to reset your password.' },
  { question: 'What are the operating hours of support?', answer: 'Our support team is available 24/7 to assist you with any issues or questions.' },
];

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <section className="about-info">
        <h2>Welcome to Our Website</h2>
        <p>We are dedicated to providing the best experience for our users. Our platform connects you with developers and offers support to address your needs.</p>
        <p>Our team works hard to ensure that you have access to the best resources and assistance. Below, you'll find answers to some of the most frequently asked questions about our website.</p>
      </section>
      
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <ul className="faq-list">
          {faqs.map((item, index) => (
            <li key={index} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
