import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './VolunteerApplication.css';

const VolunteerApplication = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    skills: '',
    experience: '',
    availability: [],
    reason: '',
    howHeard: 'social_media'
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const availabilityOptions = [
    { id: 'weekday_morning', label: 'Weekday Mornings' },
    { id: 'weekday_afternoon', label: 'Weekday Afternoons' },
    { id: 'weekday_evening', label: 'Weekday Evenings' },
    { id: 'weekend_morning', label: 'Weekend Mornings' },
    { id: 'weekend_afternoon', label: 'Weekend Afternoons' },
    { id: 'weekend_evening', label: 'Weekend Evenings' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({
        ...prev,
        availability: [...prev.availability, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        availability: prev.availability.filter(item => item !== value)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.reason || formData.availability.length === 0) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // In a real app, you would send this data to your backend
      console.log('Volunteer application submitted:', formData);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="volunteer-container">
        <div className="volunteer-wrapper">
          <div className="success-container">
            <div className="success-icon">🎉</div>
            <h1>Application Submitted!</h1>
            <p>Thank you for your interest in volunteering with us. We have received your application and will review it shortly.</p>
            <p>Our team will contact you within 3-5 business days to discuss the next steps.</p>
            
            <div className="what-next">
              <h2>What happens next?</h2>
              <ol>
                <li>Our volunteer coordinator will review your application</li>
                <li>We'll schedule a brief phone interview</li>
                <li>You'll be invited to an orientation session</li>
                <li>You'll be matched with volunteer opportunities that fit your skills and availability</li>
              </ol>
            </div>
            
            <div className="button-group">
              <Link to="/" className="home-button">Return to Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="volunteer-container">
      <div className="volunteer-wrapper">
        <div className="volunteer-header">
          <h1>Volunteer Application</h1>
          <p>Join our team of dedicated volunteers working to improve infrastructure in our community</p>
          <div className="divider"></div>
        </div>

        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="volunteer-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group half">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Your last name"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group half">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Your address (optional)"
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="form-section">
            <h2>Skills & Experience</h2>
            
            <div className="form-group">
              <label htmlFor="skills">Skills & Expertise</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="E.g., communication, organization, technical skills, etc."
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="experience">Previous Volunteer Experience</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows="3"
                placeholder="Tell us about any previous volunteer experience (optional)"
                disabled={loading}
              ></textarea>
            </div>
            
            <div className="form-group">
              <label>Availability *</label>
              <div className="checkbox-group">
                {availabilityOptions.map(option => (
                  <div key={option.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={option.id}
                      name="availability"
                      value={option.id}
                      checked={formData.availability.includes(option.id)}
                      onChange={handleCheckboxChange}
                      disabled={loading}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="reason">Why do you want to volunteer with us? *</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows="4"
                placeholder="Please tell us why you're interested in volunteering with our organization"
                required
                disabled={loading}
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="howHeard">How did you hear about us?</label>
              <select
                id="howHeard"
                name="howHeard"
                value={formData.howHeard}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="social_media">Social Media</option>
                <option value="friend">Friend or Family</option>
                <option value="website">Website</option>
                <option value="news">News or Media</option>
                <option value="event">Community Event</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            <Link to="/" className="cancel-button">
              Cancel
            </Link>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
        
        <div className="volunteer-info">
          <div className="info-icon">💡</div>
          <div className="info-content">
            <h3>Why Volunteer With Us?</h3>
            <p>By joining our volunteer team, you'll be making a direct impact on improving infrastructure in our community. Our volunteers help with community outreach, complaint verification, event organization, and more.</p>
            <p>We provide training and support for all our volunteers, and we're committed to creating a positive and fulfilling volunteer experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerApplication; 