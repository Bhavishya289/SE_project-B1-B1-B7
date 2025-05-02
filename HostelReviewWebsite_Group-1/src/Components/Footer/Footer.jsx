import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Animated bubbles in background */}
      <div className="footer-bubbles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bubble" />
        ))}
      </div>
      
      <div className="footer-content">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>BUNK BUDDIES</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Your trusted platform for finding the perfect hostel experience. 
            We connect students with quality accommodations across the country.
          </p>
        </motion.div>

        <div className="footer-links">
          <motion.div 
            className="footer-link-group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3>Explore</h3>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </motion.div>

          <motion.div 
            className="footer-link-group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Support</h3>
            <a href="#" className="nav-link">Help Center</a>
            <a href="#" className="nav-link">Safety Information</a>
            <a href="#" className="nav-link">Cancellation Options</a>
            <a href="#" className="nav-link">Report an Issue</a>
          </motion.div>

          <motion.div 
            className="footer-link-group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3>Legal</h3>
            <a href="#" className="nav-link">Privacy Policy</a>
            <a href="#" className="nav-link">Terms of Service</a>
            <a href="#" className="nav-link">Cookie Policy</a>
            <a href="#" className="nav-link">Accessibility</a>
          </motion.div>

          <motion.div 
            className="footer-link-group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Hostel Owners</h3>
            <a href="#" className="nav-link">List Your Property</a>
            <a href="#" className="nav-link">Host Resources</a>
            <a href="#" className="nav-link">Community Forum</a>
            <a href="#" className="nav-link">Hosting Tips</a>
          </motion.div>
        </div>

        <div className="footer-divider" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 style={{ marginBottom: '1rem' }}>Subscribe US</h3>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </motion.div>

        <div className="social-links">
          <motion.a
            href="#"
            className="social-icon_f"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FaFacebookF size={20} />
          </motion.a>
          <motion.a
            href="#"
            className="social-icon_t"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FaTwitter size={20} />
          </motion.a>
          <motion.a
            href="#"
            className="social-icon_i"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <FaInstagram size={20} />
          </motion.a>
          <motion.a
            href="#"
            className="social-icon_l"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <FaLinkedinIn size={20} />
          </motion.a>
          <motion.a
            href="#"
            className="social-icon_w"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <FaWhatsapp size={20} />
          </motion.a>
        </div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} BUNK BUDDIES. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
