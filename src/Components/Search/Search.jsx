import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { motion, AnimatePresence } from 'framer-motion';

const Search = () => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const hostels = [
    { id: 1, name: "Zenith Youth Boys Hostel", description: "A premium hostel with great amenities." },
    { id: 2, name: "Doon Scholars Boys Hostel", description: "Affordable and comfortable living space." },
    { id: 3, name: "Agrasen Mansion Boys Hostel", description: "Known for its peaceful environment." },
    { id: 4, name: "Sona Boys Hostel", description: "Modern facilities and friendly staff." },
    { id: 5, name: "Elemento Girls Hostel", description: "Luxurious living at its best." },
    { id: 6, name: "Aura Girls Hostel", description: "A vibrant and lively hostel." },
    { id: 7, name: "The West Ends Courts Hostel", description: "Perfect for students and professionals." },
    { id: 8, name: "Sangam House Boys Hostel", description: "Perfect for students and professionals." },
    { id: 9, name: "Doonga Boys Home Boys Hostel", description: "Perfect for students and professionals." },
    { id: 10, name: "Royal Stay Hostel", description: "Perfect for students and professionals." },
  ];

  const filteredHostels = hostels.filter((hostel) =>
    hostel.name.toLowerCase().includes(input.toLowerCase())
  );

  const handleHostelClick = (hostel) => {
    navigate(`/hostel/${hostel.id}`, { state: { hostel } });
  };

  return (
    <div className="search-container">
      <div className={`inputGroup ${input || isFocused ? 'active' : ''}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
          autoComplete="off"
        />
        <label>Search hostels...</label>
      </div>

      <AnimatePresence>
        {input && (
          <motion.ul 
            className="results-list"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filteredHostels.length > 0 ? (
              filteredHostels.map((hostel) => (
                <motion.li
                  key={hostel.id}
                  onClick={() => handleHostelClick(hostel)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="hostel-name">{hostel.name}</span>
                  <span className="hostel-desc">{hostel.description}</span>
                </motion.li>
              ))
            ) : (
              <li className="no-results">No results found</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;