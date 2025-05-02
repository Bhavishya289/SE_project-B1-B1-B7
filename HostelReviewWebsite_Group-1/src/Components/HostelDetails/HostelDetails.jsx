import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Details.css';

const HostelDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hostel: initialHostel } = location.state || {};

  const [hostel, setHostel] = useState({
    name: '',
    description: '',
    image: '',
    address: '',
    phone: '',
    facilities: [],
    ...initialHostel
  });

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    author: ''
  });
  const [activeTab, setActiveTab] = useState('details');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        setIsLoading(true);
        setImageLoaded(false);
        setImageError(false);

        if (!initialHostel) {
          throw new Error('Hostel data not found');
        }

        setHostel(prev => ({
          ...prev,
          ...initialHostel,
          facilities: initialHostel.facilities || ['WiFi', 'Laundry', 'AC', 'Game Zone', 'TV']
        }));

        if (initialHostel.image) {
          const img = new Image();
          img.src = initialHostel.image;
          img.onload = () => {
            setImageLoaded(true);
            setImageError(false);
          };
          img.onerror = () => {
            setImageError(true);
            setHostel(prev => ({
              ...prev,
              image: '/assets/hostel1.jpg'
            }));
          };
        } else {
          setImageError(true);
          setHostel(prev => ({
            ...prev,
            image: '/assets/hostel1.jpg'
          }));
        }

        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (err) {
        setError(err.message);
        setHostel(prev => ({
          ...prev,
          image: '/assets/hostel1.jpg'
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHostelDetails();
  }, [initialHostel]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const reviewToAdd = {
        ...newReview,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        id: Date.now(),
        author: newReview.author || 'Anonymous'
      };

      setReviews([reviewToAdd, ...reviews]);
      setNewReview({ rating: 5, comment: '', author: '' });
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  if (error) {
    return (
      <motion.div className="error-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2>{error}</h2>
        <motion.button onClick={() => navigate('/')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="back-button">
          Back to Home
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div className="hostel-details-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          <motion.button className="back-button" onClick={() => navigate(-1)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            ← Back to Hostels
          </motion.button>

          <motion.div className="hostel-header" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="image-container">
              <motion.img
                src={imageError ? '/assets/hostel1.jpg' : hostel.image}
                alt={hostel.name}
                className={`hostel-main-image ${!imageLoaded ? 'image-loading' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && !imageError && (
                <div className="image-loading-overlay">
                  <div className="loading-spinner small"></div>
                </div>
              )}
            </div>

            <div className="hostel-info">
              <h1>{hostel.name}</h1>
              <div className="rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <motion.span key={i} className={i < Math.round(averageRating) ? 'star filled' : 'star'} whileHover={{ scale: 1.2 }}>
                      {i < Math.round(averageRating) ? '★' : '☆'}
                    </motion.span>
                  ))}
                </div>
                <span className="rating-text">{averageRating} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
              </div>
              <p className="description">{hostel.description}</p>
              <div className="action-buttons">
                <motion.button className="book-now" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Enquiry has been sent to the owner!')
                }}>
                  Send Enquiry
                </motion.button>
                <motion.button className="share-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}>
                  Share
                </motion.button>
              </div>
            </div>
          </motion.div>

          <div className="tabs">
            <button className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>Details</button>
            <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews ({reviews.length})</button>
            <button className={activeTab === 'location' ? 'active' : ''} onClick={() => setActiveTab('location')}>Location</button>
          </div>

          {activeTab === 'details' && (
            <motion.div className="details-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="facilities-section">
                <h2>Facilities</h2>
                <div className="facilities-grid">
                  {hostel.facilities.map((facility, index) => (
                    <motion.div key={index} className="facility-item" whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                      {facility}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div className="reviews-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="add-review">
                <h3>Add Your Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="rating-input">
                    <label>Rating:</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map(num => (
                        <motion.span key={num} className={num <= newReview.rating ? 'star selected' : 'star'} onClick={() => setNewReview({...newReview, rating: num})} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          ★
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <textarea placeholder="Share your experience..." value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} required minLength="10" maxLength="450" />
                  <input type="text" placeholder="Your name (optional)" value={newReview.author} onChange={(e) => setNewReview({...newReview, author: e.target.value})} maxLength="50" />
                  <motion.button type="submit" className="submit-review" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={!newReview.comment.trim()}>
                    Submit Review
                  </motion.button>
                </form>
              </div>

              <div className="reviews-list">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <motion.div key={review.id} className="review-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                      <div className="review-header">
                        <div>
                          <span className="review-author">{review.author}</span>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <span className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? 'star filled' : 'star'}>★</span>
                          ))}
                        </span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </motion.div>
                  ))
                ) : (
                  <p className="no-reviews">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'location' && (
            <motion.div className="location-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <h2>Location</h2>
              <div className="map-placeholder">
                <p>Map would be displayed here</p>
              </div>
              <div className="contact-info">
                <h3>Contact Information</h3>
                <p><strong>Address:</strong> {hostel.address || '123 Hostel Street, Bidholi'}</p>
                <p><strong>Phone:</strong> {hostel.phone || '+1 234 567 890'}</p>
                <p><strong>Email:</strong> {hostel.email || `contact@${hostel.name.replace(/\s+/g, '').toLowerCase()}.com`}</p>
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default HostelDetails;
