import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Login.css';

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    recoveryEmail: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username) {
      alert('Please enter your username.');
      return;
    }
    if (!password) {
      alert('Please enter your password.');
      return;
    }
    alert(`Login attempt for:\nUsername: ${username}\nPassword: ${password}`);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { email, newPassword, confirmPassword } = formData;

    if (!email) {
      alert('Please enter your email.');
      return;
    }
    if (!newPassword) {
      alert('Please enter a password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    alert(`Registration submitted:\nEmail: ${email}`);
    setShowRegister(false);
    setFormData({
      username: '',
      password: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
      recoveryEmail: ''
    });
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const { recoveryEmail } = formData;

    if (!recoveryEmail) {
      alert('Please enter your email address.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(recoveryEmail)) {
      alert('Please enter a valid email address.');
      return;
    }
    alert(`Password reset link sent to:\n${recoveryEmail}`);
    setShowForgotPassword(false);
    setFormData(prev => ({
      ...prev,
      recoveryEmail: ''
    }));
  };

  return (
    <div className="login-page-container">
      {/* Animated background bubbles */}
      <div className="bg-bubbles">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="bubble"
            initial={{ y: 0, x: Math.random() * 100 }}
            animate={{
              y: [0, -100, -200, -300, -400],
              x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, Math.random() * 50 - 25, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        className='login-container'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode='wait'>
          {!showRegister ? (
            <motion.div
              key="login-form"
              className='auth-form'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className='auth-title'>Welcome Back</h2>
              <form className='form' onSubmit={handleLoginSubmit}>
                <motion.div
                  className='input-container'
                  whileFocus={{ scale: 1.03 }}
                >
                  <input 
                    type='text' 
                    name='username' 
                    placeholder='Username' 
                    className='input-field' 
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </motion.div>
                <motion.div
                  className='input-container'
                  whileFocus={{ scale: 1.03 }}
                >
                  <input 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    className='input-field' 
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </motion.div>
                
                <div className='form-options'>
                  <label className='remember-me'>
                    <input type='checkbox' id='remember'/>
                    <span className='checkmark'></span>
                    Remember me
                  </label>
                  <button 
                    type="button"
                    className='forgot-password'
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </button>
                </div>
                
                <motion.button 
                  type='submit' 
                  className='auth-button'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
              </form>
              
              <div className='auth-switch'>
                <p>Don't have an account?</p>
                <motion.button
                  type='button'
                  className='switch-cta'
                  onClick={() => setShowRegister(true)}
                  whileHover={{ scale: 1.05 }}
                >
                  Create Account
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="register-form"
              className='auth-form'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className='auth-title'>Create Account</h2>
              <form className='form' onSubmit={handleRegisterSubmit}>
                <motion.div
                  className='input-container'
                  whileFocus={{ scale: 1.03 }}
                >
                  <input 
                    type='email' 
                    name='email' 
                    placeholder='Email' 
                    className='input-field' 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </motion.div>
                <motion.div
                  className='input-container'
                  whileFocus={{ scale: 1.03 }}
                >
                  <input 
                    type='password' 
                    name='newPassword' 
                    placeholder='Password' 
                    className='input-field' 
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                  />
                </motion.div>
                <motion.div
                  className='input-container'
                  whileFocus={{ scale: 1.03 }}
                >
                  <input 
                    type='password' 
                    name='confirmPassword' 
                    placeholder='Confirm Password' 
                    className='input-field' 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </motion.div>
                
                <motion.button 
                  type='submit' 
                  className='auth-button'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Register
                </motion.button>
              </form>
              
              <div className='auth-switch'>
                <p>Already have an account?</p>
                <motion.button
                  type='button'
                  className='switch-cta'
                  onClick={() => setShowRegister(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  Sign In
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForgotPassword(false)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Reset Password</h3>
              <p>Enter your email to receive a password reset link</p>
              
              <form onSubmit={handleForgotPasswordSubmit}>
                <div className="input-container">
                  <input
                    type="email"
                    name="recoveryEmail"
                    placeholder="Your email address"
                    className="input-field"
                    value={formData.recoveryEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="modal-buttons">
                  <button 
                    type="button"
                    className="secondary-button"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="auth-button"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
