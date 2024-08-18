// src/pages/ContactUs.js
import React from 'react';
import './ContactUs.css'; // Ensure you create and link this CSS file

const teamMembers = [
  { name: 'Bayan Aljaar', email: 'bayanal3@ac.sce.ac.il', phone: '0548130454' },
  { name: 'Somaya Abu Samour', email: 'ssomaya252@gmail.com', phone: '0544822959' },
  { name: 'Israa Gergawi', email: 'asraaalgergawi@gmail.com', phone: '0523694162' },
  { name: 'Tasneem Shnaiwer', email: 'tasneemshnaiwer@gmail.com', phone: '0545993204' },
];

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <h2>Contact Information:</h2>
        <p>If you have any questions or need assistance, feel free to reach out to us:</p>
        <p>Email: softwareengieneer@gmail.com</p>
        <p>Phone: +1234567890</p>
      </div>
      
      <div className="team-info">
        <h2>Meet Our Team:</h2>
        <ul className="team-list">
          {teamMembers.map((member, index) => (
            <li key={index} className="team-member">
              <h3>{member.name}</h3>
              <p>Email: <a href={`mailto:${member.email}`}>{member.email}</a></p>
              <p>Phone: <a href={`tel:${member.phone}`}>{member.phone}</a></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;
