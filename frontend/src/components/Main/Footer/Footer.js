import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h3>Company Logo</h3>
          <p>Providing quality products for you.</p>
        </div>
        <div className="footer-links">
          <div className="footer-link-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-link-column">
            <h4>Contact</h4>
            <ul>
              <li>Email: contact@company.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Street, City</li>
            </ul>
          </div>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fa fa-facebook"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
