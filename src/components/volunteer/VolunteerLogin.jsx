import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  TextField, 
  Button, 
  InputAdornment, 
  Typography, 
  Container, 
  Box, 
  Paper, 
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { Email, Lock, Handshake } from '@mui/icons-material';

function VolunteerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [volunteerId, setVolunteerId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in and has admin role, redirect to admin dashboard
  useEffect(() => {
    if (currentUser && userRole === 'admin') {
      console.log('VolunteerLogin: Redirecting already logged in admin to dashboard');
      navigate('/admin');
    }
  }, [currentUser, userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setMessage('');
      
      // Simple validation
      if (!email) {
        setMessage('Please enter your email');
        setLoading(false);
        return;
      }
      
      if (!password) {
        setMessage('Please enter your password');
        setLoading(false);
        return;
      }
      
      // Attempt login - no complex checks, just try to log in
      await login(email, password);
      
      // Force redirect directly to direct-admin page instead of admin
      window.location.replace('/direct-admin');
      
    } catch (error) {
      console.error('Login failed:', error);
      
      // Display a simple error message
      setMessage('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          my: { xs: 3, md: 6 }, 
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1 
            }}
          >
            <Handshake 
              sx={{ 
                fontSize: 36, 
                mr: 1, 
                color: '#F59E0B' 
              }} 
            />
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              Volunteer Login
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to access your volunteer account
          </Typography>

          {message && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="volunteerId"
              label="Volunteer ID"
              name="volunteerId"
              autoComplete="off"
              autoFocus
              value={volunteerId}
              onChange={(e) => setVolunteerId(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Handshake />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 1,
                mb: 2,
                py: 1.5,
                bgcolor: '#F59E0B',
                '&:hover': {
                  bgcolor: '#D97706',
                },
                fontWeight: 500,
                fontSize: '1rem'
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            
            {/* Direct admin access link for troubleshooting */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Link 
                href="/direct-admin" 
                style={{ 
                  color: '#666', 
                  fontSize: '0.85rem', 
                  textDecoration: 'none'
                }}
              >
                Direct Admin Access (Alternative)
              </Link>
            </Box>
            
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Options
              </Typography>
            </Divider>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Not a volunteer?{' '}
                <Link to="/login" style={{ color: '#F59E0B', fontWeight: 500, textDecoration: 'none' }}>
                  Regular Login
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Want to volunteer?{' '}
                <Link to="/volunteer-application" style={{ color: '#F59E0B', fontWeight: 500, textDecoration: 'none' }}>
                  Apply Now
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default VolunteerLogin; 