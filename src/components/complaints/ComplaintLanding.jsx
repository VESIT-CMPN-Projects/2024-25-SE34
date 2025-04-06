import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Box, 
  Grid, 
  Typography, 
  Button, 
  Paper, 
  Container,
  Divider
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import EditNoteIcon from '@mui/icons-material/EditNote';

const ComplaintLanding = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to complaint form
  React.useEffect(() => {
    if (currentUser) {
      navigate('/complaints');
    }
  }, [currentUser, navigate]);

  return (
    <Box sx={{ 
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(/images/road-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      py: 8,
      color: 'white'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          {/* Left Section */}
          <Grid item xs={12} md={6} sx={{ 
            bgcolor: 'rgba(33, 33, 33, 0.8)',
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Typography variant="h3" component="h1" sx={{ 
              fontWeight: 'bold',
              mb: 3
            }}>
              Make Your Voice<br />Heard
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 5 }}>
              Join hundreds of community members who are driving change by reporting infrastructure issues.
            </Typography>
            
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                borderRadius: '50%', 
                bgcolor: '#F59E0B', 
                width: 40, 
                height: 40, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 2
              }}>
                <LooksOneIcon />
              </Box>
              <Typography variant="body1">Log in to your account</Typography>
            </Box>
            
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                borderRadius: '50%', 
                bgcolor: '#F59E0B', 
                width: 40, 
                height: 40, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 2
              }}>
                <LooksTwoIcon />
              </Box>
              <Typography variant="body1">Submit your complaint</Typography>
            </Box>
            
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                borderRadius: '50%', 
                bgcolor: '#F59E0B', 
                width: 40, 
                height: 40, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 2
              }}>
                <Looks3Icon />
              </Box>
              <Typography variant="body1">Track progress to resolution</Typography>
            </Box>
          </Grid>
          
          {/* Right Section */}
          <Grid item xs={12} md={6} sx={{ 
            bgcolor: 'white',
            p: 5,
            color: 'text.primary'
          }}>
            <Typography variant="h3" component="h2" sx={{ 
              fontWeight: 'bold',
              mb: 1,
              color: 'text.primary'
            }}>
              Register your Complaint
            </Typography>
            
            <Divider sx={{ 
              width: '60px', 
              borderColor: '#F59E0B', 
              borderWidth: 3, 
              my: 2 
            }} />
            
            <Typography variant="body1" sx={{ mb: 5, color: 'text.secondary' }}>
              Help us identify infrastructure issues by submitting a detailed report. Your input is crucial to our success.
            </Typography>
            
            {currentUser ? (
              <Button 
                variant="contained" 
                component={Link} 
                to="/complaints" 
                startIcon={<EditNoteIcon />}
                sx={{ 
                  px: 3, 
                  py: 1.5, 
                  bgcolor: '#F59E0B',
                  '&:hover': {
                    bgcolor: '#D97706'
                  }
                }}
              >
                Register Complaint
              </Button>
            ) : (
              <Button 
                variant="contained" 
                component={Link} 
                to="/login" 
                startIcon={<LoginIcon />}
                sx={{ 
                  px: 3, 
                  py: 1.5, 
                  bgcolor: '#F59E0B',
                  '&:hover': {
                    bgcolor: '#D97706'
                  }
                }}
              >
                Login to Register Complaint
              </Button>
            )}
            
            {!currentUser && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Don't have an account? <Link to="/signup" style={{ color: '#F59E0B', fontWeight: 500, textDecoration: 'none' }}>Sign up here</Link>
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ComplaintLanding; 