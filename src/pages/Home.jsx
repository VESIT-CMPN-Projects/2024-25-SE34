import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaArrowRight, FaMapMarkerAlt, FaClipboard, FaTools, FaUsers, FaChevronDown } from 'react-icons/fa';
// Material-UI imports
import { Button, Typography, Box, Container, Paper, AppBar, Toolbar, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="fade-in">
      {/* Title Page Section */}
      <Box 
        id="hero" 
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/main-img.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden'
        }}
      >
        <Container sx={{ zIndex: 10 }}>
          <Box sx={{ maxWidth: 600, textAlign: 'left' }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                color: 'white',
                lineHeight: 1.2
              }}
            >
              A Community's Fight for Better Infrastructures
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button 
                component={Link} 
                to="#what-we-do" 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: '#FFCD29', 
                  color: '#333',
                  '&:hover': { bgcolor: '#e6b800' },
                  py: 1.5,
                  px: 3
                }}
              >
                What we do
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                startIcon={<PlayArrowIcon />}
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                  py: 1.5,
                  px: 3
                }}
              >
                Play Video
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Know About Us Section */}
      <Box id="know-about-us" sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: '#f8f9fa',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background accent elements */}
        <Box sx={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,205,41,0.1) 0%, rgba(255,205,41,0.05) 50%, rgba(255,205,41,0) 70%)',
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: -50,
          right: -50,
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,205,41,0.1) 0%, rgba(255,205,41,0.05) 50%, rgba(255,205,41,0) 70%)',
        }} />
        
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center'
          }}>
            <Box sx={{ 
              order: { xs: 1, md: 2 },
              width: { xs: '100%', md: '50%' },
              position: 'relative',
              "&:hover img": {
                transform: 'scale(1.02)',
                boxShadow: 8
              }
            }}>
              <Box 
                component="img"
                src="/images/kau-image.jpg"
                  alt="Road Infrastructure" 
                sx={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  objectPosition: 'center 60%',
                  borderRadius: 3,
                  boxShadow: 4,
                  zIndex: 1,
                  position: 'relative',
                  transition: 'all 0.4s ease-in-out',
                }}
              />
              <Box sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 120,
                height: 120,
                borderRadius: '50%',
                border: '6px solid #FFCD29',
                opacity: 0.3,
                zIndex: 0
              }} />
              <Box sx={{
                position: 'absolute',
                bottom: -15,
                left: -15,
                width: 80,
                height: 80,
                borderRadius: '50%',
                border: '4px solid #FFCD29',
                opacity: 0.3,
                zIndex: 0
              }} />
            </Box>
            
            <Box sx={{ 
              order: { xs: 2, md: 1 },
              width: { xs: '100%', md: '50%' }
            }}>
              <Typography 
                variant="h6" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1,
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  position: 'relative',
                  color: 'secondary.main',
                  pl: 1,
                  "&::before": {
                    content: '""',
                    position: 'absolute',
                    left: -8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: '70%',
                    bgcolor: 'primary.main',
                    borderRadius: 1
                  }
                }}
              >
                KNOW ABOUT US
              </Typography>
              
              <Typography 
                variant="h3" 
                component="h3"
                sx={{ 
                  fontWeight: 'bold',
                  mb: 4,
                  lineHeight: 1.2,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    display: 'block',
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #FFCD29 0%, rgba(255,205,41,0.3) 100%)',
                    marginTop: 2,
                    borderRadius: 1
                  }
                }}
              >
                A Community's Fight for<br />Better Infrastructure
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography paragraph sx={{ mb: 3, fontSize: '1.05rem', color: 'text.secondary' }}>
                  Imagine having home for work or college, only to find yourself stuck in a perpetual traffic or line up mess, dodging potholes that feel more like craters. If you live in Thane and use Ghodbunder Road, then this isn't just an occasional inconvenience - it's a daily nightmare.
                </Typography>
                
                <Typography paragraph sx={{ mb: 3, fontSize: '1.05rem', color: 'text.secondary' }}>
                  For the last two decades, the significant growth in Thane's residential and commercial infrastructure has brought with it severe traffic congestion, deteriorating road conditions and many safety concerns. Recent advancements in development and traffic management have shown that smart planning can ease congestion and enhance road safety, yet Ghodbunder Road remains plagued by potholes, debris and landscape irregularities.
                </Typography>
                
                <Typography paragraph sx={{ mb: 3, fontSize: '1.05rem', color: 'text.secondary' }}>
                  In response, the Justice For Ghodbunder Road (JFGR) initiative emerged as a powerful concerned movement, pushing for urgent improvements. The movement supports collaborative decision-making between authorities and residents, focusing on transparent rehabilitation.
                </Typography>
                
                <Typography paragraph sx={{ fontSize: '1.05rem', color: 'text.secondary' }}>
                  In cities where accessible infrastructure remains a cornerstone of economic growth and quality of life, JFGR is setting up a single stretch of road to talk about setting a precedent for local engagement, responsible governance and the power of community action in shaping a better future.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* What We Do Section */}
      <Box id="what-we-do" sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Pattern background */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.5,
          zIndex: 0
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 6,
              textTransform: 'uppercase',
              display: 'inline-block',
              position: 'relative',
              color: 'secondary.main',
              pl: 1,
              "&::before": {
                content: '""',
                position: 'absolute',
                left: -8,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 4,
                height: '70%',
                bgcolor: 'primary.main',
                borderRadius: 1
              }
            }}
          >
            WHAT WE DO
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 6, md: 8 },
            alignItems: 'flex-start'
          }}>
            <Box sx={{ 
              width: { xs: '100%', md: '50%' },
              position: 'relative',
              "&:hover img": {
                transform: 'scale(1.02)',
                boxShadow: 4
              }
            }}>
              <Box 
                component="img"
                src="/images/wwd-image.jpg"
                alt="JFGR Activities"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'all 0.4s ease-in-out',
                }}
              />
              {/* Decorative elements */}
              <Box sx={{
                position: 'absolute',
                top: 20,
                left: -15,
                width: 40,
                height: 40,
                borderRadius: '8px',
                transform: 'rotate(45deg)',
                bgcolor: 'primary.main',
                opacity: 0.2,
                zIndex: -1
              }} />
              <Box sx={{
                position: 'absolute',
                bottom: 30,
                right: -15,
                width: 70,
                height: 70,
                borderRadius: '12px',
                transform: 'rotate(30deg)',
                bgcolor: 'primary.main',
                opacity: 0.15,
                zIndex: -1
              }} />
            </Box>
            
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Typography 
                variant="h4" 
                component="h3"
                sx={{ 
                  fontWeight: 'bold',
                  mb: 4,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    display: 'block',
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #FFCD29 0%, rgba(255,205,41,0.3) 100%)',
                    marginTop: 2,
                    borderRadius: 1
                  }
                }}
              >
                Our Activities and Initiatives
              </Typography>
              
              <Box sx={{ 
                p: 3, 
                borderLeft: '4px solid', 
                borderColor: 'primary.main', 
                bgcolor: 'rgba(255,205,41,0.05)', 
                borderRadius: '0 8px 8px 0',
                mb: 4
              }}>
                <Typography paragraph sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
                Justice for Ghodbunder (JFGR) is a citizen-led movement committed to transforming
                  Ghodbunder Road in Thane into a safer, more efficient route for daily commuters.
                </Typography>
              </Box>
              
              <Typography paragraph sx={{ mb: 3, fontSize: '1.05rem', color: 'text.secondary' }}>
                With rapid urbanization and increasing traffic congestion, the road has become a source of
                daily frustration due to potholes, poor maintenance, and inadequate traffic management.
              </Typography>
              
              <Typography paragraph sx={{ mb: 3, fontSize: '1.05rem', color: 'text.secondary' }}>
                At JFGR, we believe that citizens deserve better infrastructure and that their voices
                should be heard. Our platform serves as a bridge between the public and authorities,
                ensuring that road issues are not ignored but actively tracked, discussed, and pushed
                towards resolution.
              </Typography>
              
              <Typography paragraph sx={{ mb: 3, fontSize: '1.05rem', color: 'text.secondary' }}>
                Our volunteers and concerned citizens collaborate to escalate unresolved issues, raise
                awareness, and engage with local authorities to ensure timely action. We leverage social
                media, public campaigns, and direct outreach to amplify the concerns of the community.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Register Complaint Section */}
      <Box 
        id="register-complaint" 
        sx={{ 
          py: { xs: 8, md: 12 }, 
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url("/images/mumbai-night.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          overflow: 'hidden'
        }}
      >
        {/* Overlay effect */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(255,205,41,0.1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 1
        }} />
        
        <Container sx={{ position: 'relative', zIndex: 10, maxWidth: { xs: '100%', lg: 1200 } }}>
          <Paper 
            elevation={12}
            sx={{ 
              borderRadius: { xs: 3, md: 4 }, 
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 10px 25px rgba(0,0,0,0.15)',
              background: 'white',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              {/* Left column */}
              <Box 
                sx={{ 
                  width: { xs: '100%', md: '40%' }, 
                  bgcolor: 'secondary.main', 
                  color: 'white',
                  backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: { xs: 4, md: 5 },
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center'
                }}
              >
                <Box sx={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%)',
                  zIndex: 0
                }} />
                
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    sx={{ 
                      fontWeight: '800', 
                      mb: 3,
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Make Your Voice Heard
                  </Typography>
                  
                  <Typography 
                    sx={{ 
                      mb: 4, 
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                      fontWeight: 300
                    }}
                  >
                    Join hundreds of community members who are driving change by reporting infrastructure issues.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: 'primary.main', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          mr: 2.5,
                          color: 'secondary.main',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        1
                      </Box>
                      <Typography sx={{ fontSize: '1.05rem' }}>Log in to your account</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: 'primary.main', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          mr: 2.5,
                          color: 'secondary.main',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        2
                      </Box>
                      <Typography sx={{ fontSize: '1.05rem' }}>Submit your complaint</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: 'primary.main', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          mr: 2.5,
                          color: 'secondary.main',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        3
                      </Box>
                      <Typography sx={{ fontSize: '1.05rem' }}>Track progress to resolution</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              {/* Right column */}
              <Box 
                sx={{ 
                  width: { xs: '100%', md: '60%' }, 
                  p: { xs: 4, md: 6 }, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {/* Decorative corner element */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 100,
                  height: 100,
                  background: 'linear-gradient(135deg, rgba(255,205,41,0.1) 0%, rgba(255,205,41,0) 60%)',
                  borderRadius: '0 0 0 100%',
                  zIndex: 0
                }} />
                
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography 
                    variant="h3" 
                    component="h3" 
                    sx={{ 
                      fontWeight: '800', 
                      mb: 3, 
                      color: 'secondary.main',
                      letterSpacing: '0.5px',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        display: 'block',
                        width: '60px',
                        height: '4px',
                        background: 'linear-gradient(90deg, #FFCD29 0%, rgba(255,205,41,0.3) 100%)',
                        marginTop: 1.5,
                        borderRadius: 1
                      }
                    }}
                  >
                    Register your Complaint
                  </Typography>
                  
                  <Typography 
                    sx={{ 
                      mb: 5, 
                      color: 'text.secondary', 
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}
                  >
                  Help us identify infrastructure issues by submitting a detailed report. Your input is crucial to our success.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {currentUser ? (
                      <Button 
                        component={Link}
                        to="/complaints"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ 
                          py: 2,
                          px: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          borderRadius: 2,
                          boxShadow: '0 8px 20px rgba(255, 205, 41, 0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 12px 20px rgba(255, 205, 41, 0.4)'
                          }
                        }}
                        startIcon={<EditNoteIcon />}
                      >
                        Register Complaint
                      </Button>
                    ) : (
                      <Button 
                        component={Link}
                        to="/login"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ 
                          py: 2,
                          px: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          borderRadius: 2,
                          boxShadow: '0 8px 20px rgba(255, 205, 41, 0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 12px 20px rgba(255, 205, 41, 0.4)'
                          }
                        }}
                        startIcon={
                          <Box 
                            component="svg" 
                            sx={{ width: 22, height: 22 }} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </Box>
                        }
                      >
                        Login to Register Complaint
                      </Button>
                    )}
                    
                    {!currentUser && (
                      <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>
                        <Typography>
                          Don't have an account?{' '}
                          <Link 
                            to="/signup" 
                            style={{ 
                              color: '#333', 
                              fontWeight: 600, 
                              textDecoration: 'none',
                              position: 'relative',
                              display: 'inline-block',
                              transition: 'all 0.2s',
                              '&:after': {
                                content: '""',
                                position: 'absolute',
                                width: '100%',
                                height: '2px',
                                bottom: -2,
                                left: 0,
                                backgroundColor: '#FFCD29',
                                transition: 'all 0.2s'
                              },
                              '&:hover': {
                                color: '#FFCD29'
                              }
                            }}
                          >
                        Sign up here
                      </Link>
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Testimonial Section */}
      <Box sx={{ py: 8, bgcolor: '#f8f9fa' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              What People Say About Us
            </Typography>
            <Typography sx={{ maxWidth: 600, mx: 'auto', color: 'text.secondary' }}>
              Hear from community members who have experienced the impact of our work.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              md: 'repeat(2, 1fr)', 
              lg: 'repeat(3, 1fr)' 
            },
            gap: 4
          }}>
            <Paper sx={{ p: 4, boxShadow: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: 'primary.main', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', color: 'secondary.main' }}>RK</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 'bold' }}>Rajesh Kumar</Typography>
                  <Typography variant="body2" color="text.secondary">Local Resident</Typography>
                </Box>
              </Box>
              <Typography sx={{ fontStyle: 'italic' }}>
                "Thanks to JFGR's persistent efforts, the pothole at our junction that caused numerous accidents was finally fixed. Their dedication to community welfare is commendable."
              </Typography>
            </Paper>
            
            <Paper sx={{ p: 4, boxShadow: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: 'primary.main', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', color: 'secondary.main' }}>SJ</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 'bold' }}>Sunita Joshi</Typography>
                  <Typography variant="body2" color="text.secondary">Daily Commuter</Typography>
                </Box>
              </Box>
              <Typography sx={{ fontStyle: 'italic' }}>
                "I've noticed significant improvements in traffic management since JFGR started working with local authorities. My daily commute has become much more predictable."
              </Typography>
            </Paper>
            
            <Paper sx={{ 
              p: 4, 
              boxShadow: 2, 
              borderRadius: 2,
              gridColumn: { md: 'span 2', lg: 'auto' }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: 'primary.main', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', color: 'secondary.main' }}>AP</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 'bold' }}>Amit Patil</Typography>
                  <Typography variant="body2" color="text.secondary">Local Business Owner</Typography>
                </Box>
              </Box>
              <Typography sx={{ fontStyle: 'italic' }}>
                "As a business owner on Ghodbunder Road, I've seen firsthand how JFGR's advocacy has improved accessibility for customers. Their community-first approach is making a real difference."
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ 
        py: 10, 
        bgcolor: 'secondary.main', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background accent elements */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          opacity: 0.1,
          filter: 'blur(40px)'
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          right: '25%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          opacity: 0.1,
          filter: 'blur(40px)'
        }} />
        
        <Container sx={{ position: 'relative', zIndex: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="body1" 
              component="span"
              sx={{
                position: 'relative',
                display: 'inline-block',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '1px',
                mb: 3,
                textTransform: 'uppercase',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '30px',
                  height: '2px',
                  bgcolor: 'primary.main',
                  left: '-40px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '30px',
                  height: '2px',
                  bgcolor: 'primary.main',
                  right: '-40px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }
              }}
            >
              Our Impact
            </Typography>
            
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                fontWeight: 'bold', 
                mb: 3,
                background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.85) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                letterSpacing: '1px'
              }}
            >
              Making Real Change
            </Typography>
            
            <Typography 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                color: 'rgba(255,255,255,0.85)',
                fontSize: '1.15rem',
                lineHeight: 1.6,
                fontWeight: 300,
                letterSpacing: '0.3px'
              }}
            >
              With the support of our community, we've been able to make significant progress in addressing infrastructure challenges.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(3, 1fr)' 
            },
            gap: 4,
            maxWidth: 1000,
            mx: 'auto'
          }}>
            <Paper 
              elevation={0}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.05)', 
                p: 4, 
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-8px)', 
                  boxShadow: '0 16px 30px rgba(0,0,0,0.2)'
                }
              }}
            >
              <Box 
                sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  mb: 3,
                  boxShadow: '0 8px 20px rgba(255, 205, 41, 0.3)'
                }}
              >
                <FaClipboard style={{ fontSize: 30, color: '#333' }} />
              </Box>
              <Typography 
                variant="h3" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 1,
                  color: 'primary.main',
                  fontSize: '3.5rem',
                  textShadow: '0 2px 10px rgba(255, 205, 41, 0.3)'
                }}
              >
                50+
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: '1.2rem',
                  fontWeight: 500
                }}
              >
                Issues Resolved
              </Typography>
            </Paper>
            
            <Paper 
              elevation={0}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.05)', 
                p: 4, 
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-8px)', 
                  boxShadow: '0 16px 30px rgba(0,0,0,0.2)'
                }
              }}
            >
              <Box 
                sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  mb: 3,
                  boxShadow: '0 8px 20px rgba(255, 205, 41, 0.3)'
                }}
              >
                <FaUsers style={{ fontSize: 30, color: '#333' }} />
              </Box>
              <Typography 
                variant="h3" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 1,
                  color: 'primary.main',
                  fontSize: '3.5rem',
                  textShadow: '0 2px 10px rgba(255, 205, 41, 0.3)'
                }}
              >
                1000+
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: '1.2rem',
                  fontWeight: 500
                }}
              >
                Community Members
              </Typography>
            </Paper>
            
            <Paper 
              elevation={0}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.05)', 
                p: 4, 
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-8px)', 
                  boxShadow: '0 16px 30px rgba(0,0,0,0.2)'
                },
                gridColumn: { xs: '1', sm: 'span 2', md: 'auto' }
              }}
            >
              <Box 
                sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  mb: 3,
                  boxShadow: '0 8px 20px rgba(255, 205, 41, 0.3)'
                }}
              >
                <FaTools style={{ fontSize: 30, color: '#333' }} />
              </Box>
              <Typography 
                variant="h3" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 1,
                  color: 'primary.main',
                  fontSize: '3.5rem',
                  textShadow: '0 2px 10px rgba(255, 205, 41, 0.3)'
                }}
              >
                25+
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: '1.2rem',
                  fontWeight: 500
                }}
              >
                Ongoing Projects
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Community Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 }, 
          bgcolor: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background accent element */}
        <Box sx={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,205,41,0.1) 0%, rgba(255,205,41,0.05) 50%, rgba(255,205,41,0) 70%)',
          zIndex: 0
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography 
              variant="body1" 
              component="span"
              sx={{
                position: 'relative',
                display: 'inline-block',
                color: 'secondary.main',
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '1px',
                mb: 3,
                textTransform: 'uppercase',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '30px',
                  height: '2px',
                  bgcolor: 'primary.main',
                  left: '-40px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '30px',
                  height: '2px',
                  bgcolor: 'primary.main',
                  right: '-40px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }
              }}
            >
              Get Involved
            </Typography>
            
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                fontWeight: 'bold', 
                mb: 3,
                letterSpacing: '0.5px'
              }}
            >
              Join Our Community
            </Typography>
            
            <Typography 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                color: 'text.secondary',
                fontSize: '1.15rem',
                lineHeight: 1.6,
                mb: 6
              }}
            >
              Be part of a growing movement of citizens committed to making positive change in our infrastructure.
            </Typography>
          </Box>
          
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Paper
              elevation={4}
              sx={{ 
                p: { xs: 4, md: 5 }, 
                borderRadius: 4,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.1)'
                },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: { xs: 4, md: 6 }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: { xs: 100, md: 140 },
                height: { xs: 100, md: 140 },
                borderRadius: '50%',
                bgcolor: 'rgba(255,205,41,0.15)',
                flexShrink: 0
              }}>
                <FaUsers style={{ fontSize: 56, color: '#333' }} />
              </Box>
              
              <Box sx={{ 
                textAlign: { xs: 'center', md: 'left' },
                flex: 1
              }}>
                <Typography 
                  variant="h4" 
                  component="h3" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 2,
                    position: 'relative'
                  }}
                >
                  Volunteer With Us
                </Typography>
                
                <Typography 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    mb: 4
                  }}
                >
                  Contribute your time, expertise, and passion to help us create lasting impact in our community.
                </Typography>
                
                <Button 
                  component={Link}
                  to="/volunteer-application"
                  variant="outlined" 
                  color="secondary" 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    fontWeight: 'bold',
                    borderRadius: 2,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      bgcolor: 'rgba(0,0,0,0.02)',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Join as Volunteer
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Media Section */}
      <Box 
        id="media" 
        sx={{ 
          py: { xs: 8, md: 14 }, 
          bgcolor: '#f9f9f9',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 15% 50%, rgba(255,205,41,0.08) 0%, rgba(255,205,41,0) 25%)',
          zIndex: 0
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 85% 30%, rgba(51,51,51,0.05) 0%, rgba(51,51,51,0) 25%)',
          zIndex: 0
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 6, md: 8 } 
          }}>
            <Typography 
              variant="body1" 
              component="span"
              sx={{
                position: 'relative',
                display: 'inline-block',
                color: 'secondary.main',
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '1px',
                mb: 3,
                textTransform: 'uppercase',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '30px',
                  height: '2px',
                  bgcolor: 'primary.main',
                  left: '-40px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '30px',
                  height: '2px',
                  bgcolor: 'primary.main',
                  right: '-40px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }
              }}
            >
              Our Updates
            </Typography>
            
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                fontWeight: 'bold', 
                mb: 3,
                letterSpacing: '0.5px'
              }}
            >
              Media Coverage
            </Typography>
            
            <Typography 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                color: 'text.secondary',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                mb: 3
              }}
            >
              Documenting our progress and celebrating every improvement on Ghodbunder Road.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              md: 'repeat(3, 1fr)' 
            },
            gap: { xs: 4, md: 5 }
          }}>
            {/* Media Item 1 */}
            <Paper 
              id="media-01"
              elevation={0} 
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Box 
                  component="img"
                  src="/images/media-01.jpg" 
                  alt="Road Maintenance" 
                  sx={{ 
                    width: '100%',
                    height: 220,
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'rgba(255,205,41,0.9)',
                    color: 'secondary.main',
                    fontWeight: 'bold',
                    py: 0.5,
                    px: 1.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Infrastructure
                </Box>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, lineHeight: 1.3 }}>
                  Service Road Maintenance between Manpada-Majiwada by Mumbai Metro 4 Team
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    September 15, 2023
                  </Typography>
                  <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled', mx: 1 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    MMRDA
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Box 
                    component="img"
                    src="/images/media-01.jpg" 
                    alt="Thumbnail 1" 
                    sx={{ 
                      width: 70,
                      height: 50,
                      borderRadius: 1,
                      objectFit: 'cover'
                    }}
                  />
                  <Box 
                    component="img"
                    src="/images/media-01.jpg" 
                    alt="Thumbnail 2" 
                    sx={{ 
                      width: 70,
                      height: 50,
                      borderRadius: 1,
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              </Box>
            </Paper>
            
            {/* Media Item 2 */}
            <Paper 
              id="media-02"
              elevation={0} 
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Box 
                  component="img"
                  src="/images/media-02.jpg" 
                  alt="Street Light Installation" 
                  sx={{ 
                    width: '100%',
                    height: 220,
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'rgba(255,205,41,0.9)',
                    color: 'secondary.main',
                    fontWeight: 'bold',
                    py: 0.5,
                    px: 1.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Lighting
                </Box>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, lineHeight: 1.3 }}>
                  TMC Installs Street Lights at Gaimukh Ghat Following Resident Requests
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    October 3, 2023
                  </Typography>
                  <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled', mx: 1 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    TMC
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  In response to the request from Gaimukh villagers, the Thane Municipal Corporation has installed lights on both sides of the road at Gaimukh Ghat to enhance safety.
                </Typography>
              </Box>
            </Paper>
            
            {/* Media Item 3 */}
            <Paper 
              id="media-03"
              elevation={0} 
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Box 
                  component="img"
                  src="/images/media-03.jpg" 
                  alt="Tree Trimming" 
                  sx={{ 
                    width: '100%',
                    height: 220,
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'rgba(255,205,41,0.9)',
                    color: 'secondary.main',
                    fontWeight: 'bold',
                    py: 0.5,
                    px: 1.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Maintenance
                </Box>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, lineHeight: 1.3 }}>
                  Tree Trimming Operations Improve Streetlight Visibility and Road Safety
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    November 12, 2023
                  </Typography>
                  <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled', mx: 1 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    JFGR Initiative
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Trees are being trimmed so that streetlights illuminate properly, ensuring safe travel for people, especially during night time.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Home; 