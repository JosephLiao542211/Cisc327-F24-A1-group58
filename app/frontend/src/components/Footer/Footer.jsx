// Footer.js
import React from 'react';
import './Footer.css';



const Footer = ({ token }) => {
  const tok = localStorage.getItem('token') || 'generic';
  return (
    <footer className="footer">
      <div className="footer-content">
        <h1 className="logo">Airplane</h1>
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-tiktok"></i>
        </div>
      </div>
      <p className="footer-text">© 2024 Airplane LLC, All rights reserved.</p>
      <p className="footer-text">{tok || 'generic'}</p>
    </footer>
  );
};

export default Footer;
