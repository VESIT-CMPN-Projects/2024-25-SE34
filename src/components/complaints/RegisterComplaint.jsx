import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
  Alert,
  AlertTitle,
  IconButton,
  LinearProgress,
  Divider,
  Card,
  CardMedia,
  Stack
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Report as ReportIcon,
  Info as InfoIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Home as HomeIcon
} from '@mui/icons-material';

const RegisterComplaint = () => {
  const { currentUser, currentUserData } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'pothole',
    images: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Redirect non-logged in users
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/complaint-landing');
    }
  }, [currentUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      
      // Limit to 3 images
      if (formData.images.length + selectedFiles.length > 3) {
        setError('You can upload a maximum of 3 images.');
        return;
      }
      
      // Check file sizes (limit to 5MB each)
      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        setError('Each image must be less than 5MB in size.');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...selectedFiles]
      }));
      
      // Create preview URLs
      const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
      
      setError('');
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `complaints/${Date.now()}_${file.name}`);
    
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytes(storageRef, file);
      
      uploadTask
        .then(snapshot => getDownloadURL(snapshot.ref))
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          console.error("Error uploading image:", error);
          reject(error);
        });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      setUploadProgress(10);
      
      // For testing without login
      if (!currentUser) {
        setUploadProgress(100);
        setSuccess('Testing mode: Complaint would be submitted in production environment. This is just a preview.');
        setTimeout(() => {
          setSuccess('');
        }, 7000);
        setLoading(false);
        return;
      }
      
      // Upload images if any
      let imageUrls = [];
      if (formData.images.length > 0) {
        setUploadProgress(20);
        // Upload each image
        const uploadPromises = formData.images.map(file => uploadImage(file));
        imageUrls = await Promise.all(uploadPromises);
        setUploadProgress(70);
      }
      
      // Create the complaint in Firestore
      const complaintData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        type: formData.type,
        status: 'pending',
        createdBy: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUserData?.firstName + ' ' + currentUserData?.lastName,
        createdAt: serverTimestamp(),
        imageUrls: imageUrls,
        assignedTo: null,
        assignedAt: null,
        lastUpdated: serverTimestamp(),
        comments: []
      };
      
      setUploadProgress(80);
      const docRef = await addDoc(collection(db, 'complaints'), complaintData);
      setUploadProgress(100);
      
      setSuccess('Complaint submitted successfully! Thank you for your contribution to improving our community.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        type: 'pothole',
        images: []
      });
      setImagePreviewUrls([]);
      
      // Clear success message after 7 seconds
      setTimeout(() => {
        setSuccess('');
      }, 7000);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setError('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#F5F7FA' }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Register Your Complaint
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Noticed a problem? Report it, and we'll take it from here!
            </Typography>
            <Divider sx={{ 
              width: '60px', 
              borderColor: '#F59E0B', 
              borderWidth: 3, 
              mx: 'auto',
              my: 2 
            }} />
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert 
              severity="success" 
              sx={{ mb: 3, borderRadius: 2 }}
              icon={<CheckIcon fontSize="inherit" />}
            >
              <AlertTitle>Success!</AlertTitle>
              {success}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Issue Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief title describing the issue (e.g., Pothole at Kasarvadavali Junction)"
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <ReportIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  label="Detailed Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Provide details about the issue, including its severity, how long it has existed, and any hazards it presents"
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InfoIcon sx={{ mr: 1, mt: 1, color: 'text.secondary' }} />
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Precise location of the issue"
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  label="Issue Type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InfoIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  <MenuItem value="pothole">Pothole</MenuItem>
                  <MenuItem value="traffic">Traffic Signal Malfunction</MenuItem>
                  <MenuItem value="debris">Road Debris</MenuItem>
                  <MenuItem value="flooding">Road Flooding</MenuItem>
                  <MenuItem value="lighting">Street Light Issue</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#F59E0B',
                      bgcolor: 'rgba(245, 158, 11, 0.04)'
                    }
                  }}
                  onClick={() => !loading && fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    disabled={loading || formData.images.length >= 3}
                  />
                  
                  <CloudUploadIcon sx={{ fontSize: 48, color: '#F59E0B', mb: 2 }} />
                  
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {formData.images.length === 0 
                      ? 'Upload Images' 
                      : `${formData.images.length} image(s) selected`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Drag & drop or click to browse images (max 3 images)
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    Supported formats: JPG, PNG, JPEG (Max: 5MB per image)
                  </Typography>
                </Box>
              </Grid>
              
              {imagePreviewUrls.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
                    Selected Images:
                  </Typography>
                  <Grid container spacing={2}>
                    {imagePreviewUrls.map((url, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Card sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                          <CardMedia
                            component="img"
                            height="140"
                            image={url}
                            alt={`Preview ${index + 1}`}
                          />
                          <IconButton
                            aria-label="delete"
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              bgcolor: 'rgba(0, 0, 0, 0.6)',
                              color: 'white',
                              '&:hover': {
                                bgcolor: 'error.main'
                              }
                            }}
                            onClick={() => removeImage(index)}
                            disabled={loading}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
              
              {loading && (
                <Grid item xs={12}>
                  <Box sx={{ width: '100%', mb: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={uploadProgress} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        backgroundColor: 'rgba(245, 158, 11, 0.2)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#F59E0B'
                        }
                      }} 
                    />
                  </Box>
                  <Typography variant="body2" align="center" color="text.secondary">
                    {uploadProgress < 100 ? 'Processing your complaint...' : 'Complaint submitted!'}
                  </Typography>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/"
                    startIcon={<HomeIcon />}
                    sx={{ 
                      borderRadius: 2,
                      borderColor: '#D1D5DB',
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: '#9CA3AF',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ 
                      bgcolor: '#F59E0B',
                      '&:hover': {
                        bgcolor: '#D97706'
                      },
                      borderRadius: 2,
                      boxShadow: '0 4px 14px rgba(245, 158, 11, 0.25)',
                      px: 4
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Complaint'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          
          <Box sx={{ mt: 4, p: 3, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#111827' }}>
              <InfoIcon sx={{ mr: 1, color: '#F59E0B' }} />
              What happens next?
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 1.5, color: '#4B5563' }}>
                    Your complaint will be reviewed by our team
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ color: '#4B5563' }}>
                    The issue will be escalated to the appropriate authorities
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 1.5, color: '#4B5563' }}>
                    You'll receive updates on the status via email
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ color: '#4B5563' }}>
                    The complaint will be visible on your dashboard
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterComplaint; 