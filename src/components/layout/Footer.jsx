import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Stack,
  useTheme
} from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  YouTube as YouTubeIcon, 
  WhatsApp as WhatsAppIcon,
  Phone as PhoneIcon, 
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Favorite as FavoriteIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <Box sx={{ bgcolor: '#333333', color: 'white', pt: 6, pb: 2 }}>
      {/* Main Footer */}
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* About Column */}
          <Grid item xs={12} md={6} lg={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <Box 
                component="img" 
                src={process.env.PUBLIC_URL + "/logo192.png"} 
                alt="JFGR Logo" 
                sx={{ height: 40, mr: 1.5 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                JFGR
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'grey.300', maxWidth: "95%" }}>
              Justice For Ghodbunder Road (JFGR) is a citizen-led movement committed to transforming 
              Ghodbunder Road in Thane into a safer, more efficient route for daily commuters.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <IconButton 
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  color: 'white',
                  '&:hover': { 
                    bgcolor: 'primary.main', 
                    color: 'secondary.main' 
                  }
                }}
                size="small"
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton 
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  color: 'white',
                  '&:hover': { 
                    bgcolor: 'primary.main', 
                    color: 'secondary.main' 
                  }
                }}
                size="small"
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton 
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  color: 'white',
                  '&:hover': { 
                    bgcolor: 'primary.main', 
                    color: 'secondary.main' 
                  }
                }}
                size="small"
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton 
                component="a"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  color: 'white',
                  '&:hover': { 
                    bgcolor: 'primary.main', 
                    color: 'secondary.main' 
                  }
                }}
                size="small"
              >
                <YouTubeIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2.5, 
              pb: 1, 
              borderBottom: 1, 
              borderColor: 'rgba(255,255,255,0.1)',
              fontSize: '1.1rem'
            }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5} sx={{ pl: { sm: 2 } }}>
              <Box component={Link} to="/" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'grey.300',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s',
                fontSize: '0.9rem'
              }}>
                <ArrowForwardIcon sx={{ fontSize: 14, mr: 1, transform: 'rotate(45deg)' }} />
                Home
              </Box>
              <Box component={Link} to="/about" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'grey.300',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s',
                fontSize: '0.9rem'
              }}>
                <ArrowForwardIcon sx={{ fontSize: 14, mr: 1, transform: 'rotate(45deg)' }} />
                About Us
              </Box>
              <Box component={Link} to="/what-we-do" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'grey.300',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s',
                fontSize: '0.9rem'
              }}>
                <ArrowForwardIcon sx={{ fontSize: 14, mr: 1, transform: 'rotate(45deg)' }} />
                What We Do
              </Box>
              <Box component={Link} to="/complaints" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'grey.300',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s',
                fontSize: '0.9rem'
              }}>
                <ArrowForwardIcon sx={{ fontSize: 14, mr: 1, transform: 'rotate(45deg)' }} />
                Register Complaint
              </Box>
              <Box component={Link} to="/media" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'grey.300',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s',
                fontSize: '0.9rem'
              }}>
                <ArrowForwardIcon sx={{ fontSize: 14, mr: 1, transform: 'rotate(45deg)' }} />
                Media
              </Box>
              <Box component={Link} to="/login" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'grey.300',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s',
                fontSize: '0.9rem'
              }}>
                <ArrowForwardIcon sx={{ fontSize: 14, mr: 1, transform: 'rotate(45deg)' }} />
                Login/Register
              </Box>
            </Stack>
          </Grid>
          
          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3} lg={4} sx={{ pl: { md: 4, lg: 6 } }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2.5, 
              pb: 1, 
              borderBottom: 1, 
              borderColor: 'rgba(255,255,255,0.1)',
              fontSize: '1.1rem'
            }}>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex' }}>
                <LocationOnIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 18, mt: 0.5, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'grey.300', fontSize: '0.9rem' }}>
                  123 Main Street, <br />Ghodbunder Road, <br />Thane, Maharashtra
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 16, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'grey.300', fontSize: '0.9rem' }}>
                  +91 9773776900
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 16, flexShrink: 0 }} />
                <Typography 
                  component="a" 
                  href="mailto:info@jfgr.org" 
                  variant="body2" 
                  sx={{ 
                    color: 'grey.300', 
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' },
                    fontSize: '0.9rem'
                  }}
                >
                  info@jfgr.org
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WhatsAppIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 16, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'grey.300', fontSize: '0.9rem' }}>
                  WhatsApp: +91 9773776900
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      
      {/* Copyright */}
      <Box sx={{ 
        borderTop: 1, 
        borderColor: 'rgba(255,255,255,0.1)', 
        mt: 5,
        pt: 2.5,
        pb: 1, 
        bgcolor: 'rgba(0,0,0,0.1)'
      }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="body2" sx={{ color: 'grey.400', fontSize: '0.85rem' }}>
                &copy; {currentYear} Justice For Ghodbunder Road. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' }, mt: { xs: 1.5, md: 0 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Typography variant="body2" sx={{ color: 'grey.400', fontSize: '0.85rem' }}>
                  Made with
                </Typography>
                <FavoriteIcon sx={{ mx: 0.5, fontSize: 12, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'grey.400', fontSize: '0.85rem' }}>
                  for the community
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer; 