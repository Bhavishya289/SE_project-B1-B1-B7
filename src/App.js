import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import { motion } from "framer-motion";
import Login from "./Components/Login/Login";
import Search from "./Components/Search/Search";
import HostelDetails from "./Components/HostelDetails/HostelDetails";
import Footer from "./Components/Footer/Footer";
// import ChatbotButton from './Components/ChatbotButton';

const RatedHostel = () => {
  return (
    <div className="rated-hostel-container">
      <h3 className="elegant-title">
        <span className="letter-container">
          <span className="letter-t">T</span>
          <span className="letter-rest">op</span>
        </span>
        <span className="letter-container">
          <span className="letter-t">R</span>
          <span className="letter-rest">ated</span>
        </span>
        <span className="letter-rest"> Hostels</span>
      </h3>
    </div>
  );
};


const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 10) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="navbar-brand nav-link">BUNK BUDDIES</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
      <Search />
      <div>
        <button className="nav-right">
          <Link to="/login" className="nav-link"> 
          Login </Link>
        </button>
      </div>
    </nav>
  );
};

const Home = () => {
  const hostels = [
    {
      id: 1,
      name: "Zenith Youth Boys Hostel",
      description: "A premium hostel with great amenities.",
      image: "/assets/zenith youth boys hostel.jpeg.jpg",
      facilities: ["WiFi", "TV", "Laundry", "Game Zone", "AC"],
    },
    {
      id: 2,
      name: "Doon Scholars Boys Hostel",
      description: "Affordable and comfortable living space.",
      image: "/assets/doon-scholars-boys-hostel-bidholi-dehradun-hostels-peruizjf2g.avif",
      facilities: ["WiFi", "TV", "Laundry", "Game Zone", "AC"],
    },
    {
      id: 3,
      name: "Sona Boys Hostel",
      description: "Modern facilities and friendly staff.",
      image: "/assets/sona-boys-hostel-bidholi-dehradun-hostel-for-boy-students-jjatjex28r.webp",
      facilities: ["WiFi", "TV", "Laundry", "Game Zone", "AC"],
    },
    {
      id: 4,
      name: "Agrasen Boys Hostel",
      description: "Modern facilities and friendly staff.",
      image: "/assets/agrasen-mansion-boys-hostel-bidholi-bidholi-dehradun-hostels-sl1hgd46f9.jpg",
      facilities: ["WiFi", "TV", "Laundry", "Game Zone", "AC"],
    },
    {
      id: 5,
      name: "Woodstock Girls Hostel",
      description: "Modern facilities and friendly staff.",
      image: "/assets/woodstock girls hostel.jpeg.jpg",
      facilities: ["WiFi", "TV", "Laundry", "Game Zone", "AC"],
    },
    {
      id: 6,
      name: "Elemento Girls Hostel",
      description: "Modern facilities and friendly staff.",
      image: "/assets/elemento girls hostel.jpeg.jpg",
      facilities: ["WiFi", "TV", "Laundry", "Game Zone", "AC"],
    },
  ];

  const duplicatedHostels = [...hostels, ...hostels];

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <motion.h1
          className="title"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          BUNK BUDDIES - Find your way of living
        </motion.h1>

        <p className="description_1">Stay, Study</p>
        <p className="description_2">And live your best life.</p>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose BUNK BUDDIES?</h2>
        <div className="features-container">
          <div className="feature-item">
            <div className="feature-icon">🏆</div>
            <div className="feature-text">Hostels reviewed by students</div>
            <div className="feature-underline"></div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⭐</div>
            <div className="feature-text">Best hostels</div>
            <div className="feature-underline"></div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📸</div>
            <div className="feature-text">Find every frame of hostel</div>
            <div className="feature-underline"></div>
          </div>
        </div>
      </section>

      {/* Hostel Showcase Section */}
      <section className="hostel-showcase">
        <div className="hostel-showcase-up">
          <span>
            <RatedHostel/>
          </span>
        </div>
        <div className="hostels-container">
          <div className="hostels-track">
            <div className="hostels">
              {duplicatedHostels.map((hostel, index) => (
                <div className="card" key={`${hostel.id}-${index}`}>
                  <Link 
                    to={`/hostel/${hostel.id}`} 
                    state={{ hostel }}
                    className="card-link-wrapper"
                  >
                    <div className="card-image-wrapper">
                    <img className="card-image" src={hostel.image} alt={hostel.name} />
                    </div>
                    <div className="card-content">
                      <h3 className="hostel-name">{hostel.name}</h3>
                      <div className="facilities">
                        {hostel.facilities.slice(0, 6).map((facility, i) => (
                          <span key={i} className="facility" data-facility={facility}>
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <Link to="/chatbot" className="chatbot-button">
      Chat With Us
    </Link> */}
    {/* <ChatbotButton/> */}
      <Footer/>
    </div>
  );
};

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="about-title">
        <span className="title-part">About</span>
        <span className="title-part">BUNK BUDDIES</span>
        </h2>
        
        <div className="about-card">
          <div className="card-content">
            <div className="icon-wrapper">
              <div className="about-icon">🏠</div>
            </div>
            <p className="about-description">
              A revolutionary platform connecting students with the <span className="highlight">best hostels</span> 
              near their universities. Our verified reviews and comprehensive listings help you find your 
              <span className="highlight"> perfect home away from home</span>.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-2">
              <div className="feature-icon-2">⭐</div>
              <p>Student-reviewed accommodations</p>
            </div>
            <div className="feature-2">
              <div className="feature-icon-2">📊</div>
              <p>Detailed ratings system</p>
            </div>
            <div className="feature-2">
              <div className="feature-icon-2">📍</div>
              <p>Prime locations near campuses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <motion.div 
      className="contact-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contact-content">
        <motion.h2 
          className="contact-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Get in <span className="highlight">Touch</span>
        </motion.h2>

        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div>
              <h3>Email Us</h3>
              <p>contact@bunkbuddies.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📱</div>
              <div>
                <h3>Call Us</h3>
                <p>+1 (123) 456-7890</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <h3>Visit Us</h3>
                <p>123 Campus Lane, University Town</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-container"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {isSubmitted ? (
              <motion.div 
                className="success-message"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/hostel/:id" element={<HostelDetails />} />
    </Routes>
  </Router>
);

export default App;    