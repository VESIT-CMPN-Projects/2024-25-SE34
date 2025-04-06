import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, deleteUser } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Import db from firebase.js
import {
  TextField,
  Button,
  InputAdornment,
  Typography,
  Container,
  Box,
  Paper,
  Alert,
  Grid,
  Checkbox,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import { 
  Person, 
  Lock, 
  Email, 
  AccountCircle, 
  VpnKey 
} from '@mui/icons-material';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [showSecretField, setShowSecretField] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // The admin secret key - using environment variable
  const ADMIN_SECRET_KEY = process.env.REACT_APP_ADMIN_SECRET_KEY || "JFGR-Admin-2023-SecureKey";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Attempting signup with:', { email, password, firstName, lastName });
      setError('');
      setLoading(true);
      
      // Firebase requires passwords to be at least 6 characters
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Determine if this is an admin account based on the secret key
      const isAdmin = secretKey === ADMIN_SECRET_KEY;
      
      // Create the user with Firebase directly instead of through context
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Add display name to the user profile
      const displayName = `${firstName} ${lastName}`.trim();
      await updateProfile(user, {
        displayName: displayName || 'Anonymous', // Fallback if no name is provided
      });
      
      // Save user data to Firestore
      const userId = user.uid;
      const timestamp = new Date();

      // Set user role and permissions based on whether the secret key is correct
      const role = isAdmin ? 'admin' : 'user';
      const permissions = isAdmin 
        ? [
            'read_all_data',
            'create_complaints',
            'update_complaints',
            'delete_complaints',
            'manage_users',
            'manage_volunteers',
            'assign_tasks',
            'access_admin_dashboard',
            'view_analytics',
            'manage_assignments',
            'approve_volunteers',
            'create_admins'
          ] 
        : ['read_own_data', 'create_complaints', 'update_own_complaints'];
      
      const userData = {
        firstName,
        lastName,
        username,
        email,
        displayName: displayName || 'Anonymous',
        role,
        permissions,
        photoURL: user.photoURL || '',
        createdAt: timestamp,
        lastLogin: timestamp,
        complaints: [],
        isAdmin: isAdmin, // Explicit flag for admin status
        isActive: true,
        metadata: {
          createdAt: timestamp,
          lastLogin: timestamp,
          lastUpdated: timestamp
        }
      };

      // If admin, add additional admin-specific fields
      if (isAdmin) {
        userData.adminMetadata = {
          adminSince: timestamp,
          adminLevel: 'full',
          canAssignTasks: true,
          canManageVolunteers: true,
          canManageAdmins: true
        };
      }

      // Save to Firestore, and roll back if it fails
      try {
        await setDoc(doc(db, "users", userId), userData);
        console.log('User created successfully and data saved to Firestore:', user);
        if (isAdmin) {
          console.log('Created with ADMIN privileges');
        }
      } catch (firestoreError) {
        console.error('Error saving to Firestore:', firestoreError);
        // Roll back: delete the user from Authentication
        await deleteUser(user);
        throw new Error('Failed to save user data to Firestore: ' + firestoreError.message);
      }
      
      // Navigate to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle specific Firebase errors
      let errorMessage = 'Failed to create an account';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak (minimum 6 characters)';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error - please check your connection';
          break;
        default:
          errorMessage = `Failed to create an account: ${error.message}`;
      }
      
      console.log('Setting error message:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
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
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Sign Up
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Create your account to get started
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mt: 2 }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mt: 2 }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 3 }}
              variant="outlined"
            />
            
            <TextField
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
              sx={{ mt: 3 }}
              variant="outlined"
            />
            
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              helperText="Password must be at least 6 characters"
              sx={{ mt: 3 }}
              variant="outlined"
            />
            
            <FormControlLabel
              control={
                <Checkbox 
                  checked={showSecretField}
                  onChange={() => setShowSecretField(!showSecretField)}
                  color="primary"
                />
              }
              label="I have an admin access code"
              sx={{ mt: 1 }}
            />
            
            {showSecretField && (
              <TextField
                fullWidth
                name="secretKey"
                label="Admin Secret Key"
                type="password"
                id="secretKey"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  ),
                }}
                helperText="Enter the admin secret key to create an administrator account"
                sx={{ mt: 3 }}
                variant="outlined"
              />
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#F59E0B', fontWeight: 500, textDecoration: 'none' }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;