import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Container, 
  Menu, 
  MenuItem, 
  Fade,
  useScrollTrigger,
  Avatar,
  Divider,
  ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import ImageIcon from '@mui/icons-material/Image';
import ReportIcon from '@mui/icons-material/Report';
import LoginIcon from '@mui/icons-material/Login';

// For hiding the navbar on scroll down and showing on scroll up
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginMenuAnchor, setLoginMenuAnchor] = useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuOpen = Boolean(anchorEl);
  const loginMenuOpen = Boolean(loginMenuAnchor);

  // Navigation items with icons
  const navItems = [
    { name: 'Know About Us', path: '/#know-about-us', section: 'know-about-us', icon: <InfoIcon fontSize="small" /> },
    { name: 'What We Do', path: '/#what-we-do', section: 'what-we-do', icon: <WorkIcon fontSize="small" /> },
    { name: 'Media', path: '/#media', section: 'media', icon: <ImageIcon fontSize="small" /> },
    { name: 'Register Complaint', path: '/complaints', section: null, icon: <ReportIcon fontSize="small" /> }
  ];

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      // Only check for active sections on the home page
      if (location.pathname === '/') {
        // Get all sections
        const sections = [
          'hero',
          'know-about-us',
          'what-we-do',
          'media',
          'register-complaint'
        ];

        // Find which section is currently in viewport
        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            const headerHeight = document.querySelector('.MuiAppBar-root')?.offsetHeight || 0;
            
            // Check if section is in viewport (with offset for header)
            if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle smooth scrolling for anchor links
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    console.log(`Attempting to scroll to section: ${id}`);
    
    // Close mobile drawer if open
    if (mobileOpen) {
      setMobileOpen(false);
    }
    
    const element = document.getElementById(id);
    if (element) {
      console.log(`Found element with id: ${id}`);
      // Get the header height to offset the scroll position
      const headerHeight = document.querySelector('.MuiAppBar-root')?.offsetHeight || 0;
      console.log(`Header height: ${headerHeight}px`);
      
      // Method 1: Using scrollTo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Method 2: Alternative using scrollIntoView (as a fallback)
      setTimeout(() => {
        if (Math.abs(window.pageYOffset - offsetPosition) > 50) {
          console.log('Using scrollIntoView as fallback');
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          // Adjust for header
          setTimeout(() => {
            window.scrollBy(0, -headerHeight);
          }, 100);
        }
      }, 300);
    } else if (location.pathname !== '/') {
      // If we're not on the home page, navigate there first then scroll
      console.log(`Element with id ${id} not found, navigating to home page first`);
      navigate('/');
      // Add a small delay to allow the page to load before scrolling
      setTimeout(() => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          console.log(`Found element after navigation: ${id}`);
          const headerHeight = document.querySelector('.MuiAppBar-root')?.offsetHeight || 0;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          console.log(`Element with id ${id} still not found after navigation`);
        }
      }, 500); // Increased timeout to ensure page loads
    } else {
      console.log(`Element with id ${id} not found`);
    }
  };

  // Handle navigation for both anchor links and direct routes
  const handleNavigation = (e, path, section) => {
    e.preventDefault();
    
    // Close mobile drawer if open
    if (mobileOpen) {
      setMobileOpen(false);
    }

    // If it's an anchor link (contains #)
    if (path.includes('#')) {
      handleSmoothScroll(e, section);
    } else {
      // For direct routes
      navigate(path);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      handleCloseMenu();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  const handleLoginMenuOpen = (event) => {
    setLoginMenuAnchor(event.currentTarget);
  };
  
  const handleLoginMenuClose = () => {
    setLoginMenuAnchor(null);
  };

  return (
    <ElevationScroll>
      <AppBar position="sticky" color="inherit" sx={{ 
        backgroundColor: 'background.paper',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo/Brand - visible on all screens */}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                color: '#F59E0B',
                textDecoration: 'none',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                mr: 4
              }}
            >
              JFGR
            </Typography>

            {/* Mobile menu icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Desktop Navigation Items - Centered */}
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  onClick={(e) => handleNavigation(e, item.path, item.section)}
                  sx={{
                    mx: 1.5,
                    px: 1.5,
                    py: 1,
                    color: activeSection === item.section ? '#F59E0B' : 'text.primary',
                    fontWeight: 500,
                    borderRadius: 1.5,
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'rgba(245, 158, 11, 0.06)',
                      color: '#F59E0B'
                    },
                    '&::after': activeSection === item.section ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 6,
                      left: '30%',
                      width: '40%',
                      height: 3,
                      backgroundColor: '#F59E0B',
                      borderRadius: 4
                    } : {}
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            
            {/* User Menu - Moved to the right */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {currentUser ? (
                <>
                  <Button
                    onClick={handleMenuOpen}
                    endIcon={<KeyboardArrowDownIcon />}
                    startIcon={<Avatar sx={{ width: 32, height: 32, bgcolor: '#F59E0B' }}>
                      <PersonIcon />
                    </Avatar>}
                    sx={{
                      ml: 2,
                      px: 2,
                      py: 0.7,
                      textTransform: 'none',
                      color: 'text.primary',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(245, 158, 11, 0.06)'
                      }
                    }}
                  >
                    Profile
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleCloseMenu}
                    TransitionComponent={Fade}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1,
                        minWidth: 200,
                        borderRadius: 2,
                        overflow: 'visible',
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        }
                      }
                    }}
                  >
                    <MenuItem 
                      onClick={handleLogout}
                      sx={{
                        py: 1.5,
                        px: 2,
                        '&:hover': {
                          backgroundColor: 'error.lighter'
                        }
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText primary="Logout" primaryTypographyProps={{ color: 'error.main' }} />
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    aria-controls={loginMenuOpen ? 'login-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={loginMenuOpen ? 'true' : undefined}
                    onClick={handleLoginMenuOpen}
                    variant="contained"
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      ml: 2,
                      px: 2.5,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 500,
                      backgroundColor: '#F59E0B',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                      '&:hover': {
                        backgroundColor: '#D97706',
                        boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)'
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Menu
                    id="login-menu"
                    anchorEl={loginMenuAnchor}
                    open={loginMenuOpen}
                    onClose={handleLoginMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'login-button',
                    }}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1.5,
                        minWidth: 220,
                        borderRadius: 2,
                        overflow: 'visible',
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        }
                      }
                    }}
                  >
                    <MenuItem 
                      component={Link}
                      to="/login"
                      onClick={handleLoginMenuClose}
                      sx={{ py: 1.5, px: 2 }}
                    >
                      <ListItemIcon>
                        <LoginIcon fontSize="small" sx={{ color: '#F59E0B' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="User Login" 
                        primaryTypographyProps={{ 
                          fontWeight: 500 
                        }} 
                      />
                    </MenuItem>
                    <MenuItem 
                      component={Link}
                      to="/volunteer-login"
                      onClick={handleLoginMenuClose}
                      sx={{ py: 1.5, px: 2 }}
                    >
                      <ListItemIcon>
                        <HandshakeIcon fontSize="small" sx={{ color: '#F59E0B' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Volunteer Login" 
                        primaryTypographyProps={{ 
                          fontWeight: 500 
                        }} 
                      />
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>

            {/* Mobile Drawer */}
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true // Better mobile performance
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { 
                  boxSizing: 'border-box', 
                  width: 280,
                  backgroundColor: 'background.paper',
                  borderRadius: '16px 0 0 16px',
                },
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  component={Link}
                  to="/"
                  onClick={handleDrawerToggle}
                  sx={{
                    fontWeight: 800,
                    color: '#F59E0B',
                    textDecoration: 'none',
                    display: 'block',
                    mb: 3
                  }}
                >
                  JFGR
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem
                    component={Link}
                    to="/"
                    onClick={handleDrawerToggle}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      py: 1.2,
                      '&:hover': {
                        backgroundColor: 'rgba(245, 158, 11, 0.06)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <HomeIcon sx={{ color: '#F59E0B' }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                
                  {navItems.map((item) => (
                    <ListItem
                      key={item.name}
                      onClick={(e) => {
                        handleNavigation(e, item.path, item.section);
                        handleDrawerToggle();
                      }}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        py: 1.2,
                        '&:hover': {
                          backgroundColor: 'rgba(245, 158, 11, 0.06)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {React.cloneElement(item.icon, { sx: { color: '#F59E0B' } })}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}
                  
                  <Divider sx={{ my: 2 }} />
                  
                  {currentUser ? (
                    <ListItem
                      onClick={handleLogout}
                      sx={{
                        borderRadius: 2,
                        py: 1.2,
                        color: 'error.main',
                        '&:hover': {
                          backgroundColor: 'error.lighter'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <LogoutIcon color="error" />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  ) : (
                    <>
                      <ListItem
                        component={Link}
                        to="/login"
                        onClick={handleDrawerToggle}
                        sx={{
                          borderRadius: 2,
                          py: 1.2,
                          mb: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(245, 158, 11, 0.06)'
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <LoginIcon sx={{ color: '#F59E0B' }} />
                        </ListItemIcon>
                        <ListItemText primary="User Login" />
                      </ListItem>
                      <ListItem
                        component={Link}
                        to="/volunteer-login"
                        onClick={handleDrawerToggle}
                        sx={{
                          borderRadius: 2,
                          py: 1.2,
                          '&:hover': {
                            backgroundColor: 'rgba(245, 158, 11, 0.06)'
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <HandshakeIcon sx={{ color: '#F59E0B' }} />
                        </ListItemIcon>
                        <ListItemText primary="Volunteer Login" />
                      </ListItem>
                    </>
                  )}
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;