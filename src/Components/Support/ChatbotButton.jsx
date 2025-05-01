import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./ChatbotButton.css";

const ChatbotButton = () => {
  return (
  
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className="chatbot-button-container"
    >
      <Link to="/chatbot" className="chatbot-button">
        <span className="chatbot-emoji">💬</span>
        <span className="chatbot-text">Chat Now</span>
        <span className="chatbot-ripple"></span>
        <span className="chatbot-glow"></span>
      </Link>
    </motion.div>
  );
};

export default ChatbotButton;