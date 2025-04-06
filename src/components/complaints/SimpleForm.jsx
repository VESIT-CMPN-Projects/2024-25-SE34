import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './SimpleForm.css';

// Set this to false for testing without login, true to enforce login
const REQUIRE_LOGIN = true;

const SimpleForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'pothole',
    images: []
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const fileInputRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!formData.title || !formData.description || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSuccess('Testing mode: Your complaint has been submitted successfully. Thank you for contributing to community improvement!');
      setLoading(false);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        type: 'pothole',
        images: []
      });
      setImagePreviewUrls([]);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
      }, 5000);
    }, 1500);
  };
  
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      
      // Limit to 3 images
      if (imagePreviewUrls.length + selectedFiles.length > 3) {
        setError('You can upload a maximum of 3 images.');
        return;
      }
      
      // Create preview URLs
      const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
      
      setError('');
    }
  };
  
  const removeImage = (index) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // If not logged in and login is required, show login prompt
  if (REQUIRE_LOGIN && !currentUser) {
    return (
      <div className="complaint-form-container">
        <div className="complaint-form-wrapper">
          <div className="form-header">
            <h1>Register Your Complaint</h1>
            <p>Noticed a problem? Report it, and we'll take it from here!</p>
            <div className="divider"></div>
          </div>
          
          <div className="login-required-box">
            <div className="login-icon">🔐</div>
            <h2>Login Required</h2>
            <p>You need to be logged in to register a complaint. This helps us track and follow up on your reports.</p>
            
            <div className="login-benefits">
              <h3>Benefits of logging in:</h3>
              <ul>
                <li>Track the status of your complaints</li>
                <li>Receive update notifications</li>
                <li>View your complaint history</li>
                <li>Communicate with authorities</li>
              </ul>
            </div>
            
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                Login to Continue
              </Link>
              <div className="signup-prompt">
                <span>Don't have an account?</span>
                <Link to="/signup">Sign up here</Link>
              </div>
            </div>
          </div>
          
          <div className="info-box">
            <div className="info-header">
              <span className="info-icon">ℹ️</span>
              <h3>What happens next?</h3>
            </div>
            
            <div className="info-content">
              <div className="info-column">
                <ul>
                  <li>Your complaint will be reviewed by our team</li>
                  <li>The issue will be escalated to the appropriate authorities</li>
                </ul>
              </div>
              <div className="info-column">
                <ul>
                  <li>You'll receive updates on the status via email</li>
                  <li>The complaint will be visible on your dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="complaint-form-container">
      <div className="complaint-form-wrapper">
        <div className="form-header">
          <h1>Register Your Complaint</h1>
          <p>Noticed a problem? Report it, and we'll take it from here!</p>
          <div className="divider"></div>
        </div>
        
        {success && (
          <div className="success-alert">
            <p>✅ {success}</p>
          </div>
        )}
        
        {error && (
          <div className="error-alert">
            <p>⚠️ {error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Issue Title *</label>
            <div className="input-container">
              <span className="icon">📋</span>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Brief title describing the issue"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Detailed Description *</label>
            <div className="input-container">
              <span className="icon">📝</span>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Provide details about the issue, including its severity, how long it has existed, and any hazards it presents"
                required
                disabled={loading}
              ></textarea>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="location">Location *</label>
              <div className="input-container">
                <span className="icon">📍</span>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Precise location of the issue"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="form-group half">
              <label htmlFor="type">Issue Type</label>
              <div className="input-container">
                <span className="icon">🔍</span>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="pothole">Pothole</option>
                  <option value="traffic">Traffic Signal Malfunction</option>
                  <option value="debris">Road Debris</option>
                  <option value="flooding">Road Flooding</option>
                  <option value="lighting">Street Light Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="upload-container" onClick={handleFileSelect}>
            <input 
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleImageChange}
              disabled={loading || imagePreviewUrls.length >= 3}
            />
            <div className="upload-icon">📸</div>
            <h3>Upload Images</h3>
            <p>Drag & drop or click to browse images (max 3 images)</p>
            <small>Supported formats: JPG, PNG, JPEG (Max: 5MB per image)</small>
          </div>
          
          {imagePreviewUrls.length > 0 && (
            <div className="image-previews">
              <h4>Selected Images ({imagePreviewUrls.length}/3)</h4>
              <div className="preview-grid">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="preview-card">
                    <img src={url} alt={`Preview ${index + 1}`} />
                    <button 
                      type="button" 
                      className="remove-btn" 
                      onClick={() => removeImage(index)}
                      disabled={loading}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {loading && (
            <div className="loading-container">
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
              <p>Submitting your complaint...</p>
            </div>
          )}
          
          <div className="button-container">
            <Link to="/" className="cancel-button">
              <span>🏠</span> Cancel
            </Link>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
        
        <div className="info-box">
          <div className="info-header">
            <span className="info-icon">ℹ️</span>
            <h3>What happens next?</h3>
          </div>
          
          <div className="info-content">
            <div className="info-column">
              <ul>
                <li>Your complaint will be reviewed by our team</li>
                <li>The issue will be escalated to the appropriate authorities</li>
              </ul>
            </div>
            <div className="info-column">
              <ul>
                <li>You'll receive updates on the status via email</li>
                <li>The complaint will be visible on your dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleForm; 