import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  styled,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  LinearProgress,
  Badge,
  Divider,
  Tooltip
} from '@mui/material';
import {
  Flight,
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  FavoriteBorder,
  Search,
  Logout,
  Settings,
  Dashboard
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Zoom } from '@mui/material';

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(0, 55, 85, 0.7)',
  backdropFilter: 'blur(15px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(0, 55, 85, 0.8)',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.9)',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '1rem',
  position: 'relative',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #4fc3f7, #b3e5fc)',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
    '&:before': {
      width: '80%',
    },
  },
  '&.active': {
    color: '#ffffff',
    '&:before': {
      width: '80%',
    },
  },
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '1.8rem',
  letterSpacing: '-0.5px',
  background: 'linear-gradient(45deg, #ffffff, #b3e5fc)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const AirplaneIcon = styled(Flight)(({ theme }) => ({
  color: '#b3e5fc',
  marginRight: theme.spacing(1),
  transform: 'rotate(45deg)',
  animation: 'pulse 3s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'rotate(45deg) scale(1)', opacity: 1 },
    '50%': { transform: 'rotate(45deg) scale(1.1)', opacity: 0.8 },
    '100%': { transform: 'rotate(45deg) scale(1)', opacity: 1 },
  },
}));

const GlassDrawer = styled(Box)(({ theme }) => ({
  width: 280,
  height: '100%',
  background: 'rgba(0, 55, 85, 0.85)',
  backdropFilter: 'blur(15px)',
  color: '#ffffff',
  padding: theme.spacing(2, 0),
}));

const DrawerListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 8,
  margin: theme.spacing(0.5, 2),
  padding: theme.spacing(1.5, 2),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateX(5px)',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
    color: '#b3e5fc',
  },
}));

const Navbar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logout();
      navigate('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const drawer = (
    <GlassDrawer>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2 }}>
        <AirplaneIcon />
        <LogoTypography variant="h6">TravelVibe</LogoTypography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 2 }} />
      <List>
        {[
          { text: 'Home', icon: <Dashboard />, path: '/home' },
          { text: 'Offers', icon: <FavoriteBorder />, path: '#offers' },
          { text: 'Search', icon: <Search />, path: '#search' },
          { text: 'Contact', icon: <AccountCircle />, path: '#contact' },
        ].map((item) => (
          <DrawerListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
          >
            {item.icon}
            <ListItemText 
              primary={item.text} 
              sx={{ '& .MuiTypography-root': { fontWeight: 500 } }} 
            />
          </DrawerListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
      <DrawerListItem 
        button 
        onClick={handleLogout} 
        disabled={isLoggingOut}
        sx={{ color: '#ff6b6b' }}
      >
        <Logout />
        <ListItemText primary={isLoggingOut ? 'Logging Out...' : 'Logout'} />
      </DrawerListItem>
      {isLoggingOut && <LinearProgress sx={{ mx: 2, bgcolor: 'transparent' }} />}
    </GlassDrawer>
  );

  return (
    <GlassAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        py: 1,
        px: { xs: 1, sm: 2, md: 3 }
      }}>
        <Box display="flex" alignItems="center">
          <Zoom in timeout={800}>
            <Box 
              display="flex" 
              alignItems="center" 
              component={Link} 
              to="/home"
              sx={{ textDecoration: 'none' }}
            >
              <AirplaneIcon />
              <LogoTypography variant="h6">TravelVibe</LogoTypography>
            </Box>
          </Zoom>
        </Box>
        
        {isMobile ? (
          <>
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip title="Notifications">
                <IconButton 
                  color="inherit" 
                  onClick={handleNotificationsOpen}
                  sx={{ mr: 1 }}
                >
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
              <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
            
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              PaperProps={{ sx: { backgroundColor: 'transparent' } }}
            >
              {drawer}
            </Drawer>
            
            <Menu
              anchorEl={notificationsAnchor}
              open={Boolean(notificationsAnchor)}
              onClose={handleNotificationsClose}
              PaperProps={{
                sx: {
                  width: 320,
                  maxWidth: '100%',
                  bgcolor: 'rgba(0, 55, 85, 0.95)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  color: '#ffffff',
                  p: 1,
                },
              }}
            >
              <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 600 }}>
                Notifications (3)
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              {['New offer in Bali', 'Your booking confirmed', 'Special discount'].map((text) => (
                <MenuItem 
                  key={text} 
                  onClick={handleNotificationsClose}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <ListItemText 
                    primary={text} 
                    secondary="2 hours ago"
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.6)' }}
                  />
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <NavButton component={Link} to="/home">Home</NavButton>
            <NavButton href="#offers">Offers</NavButton>
            <NavButton href="#search">Search</NavButton>
            <NavButton href="#contact">Contact</NavButton>
            
            <Tooltip title="Notifications">
              <IconButton 
                color="inherit" 
                onClick={handleNotificationsOpen}
                sx={{ 
                  ml: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={notificationsAnchor}
              open={Boolean(notificationsAnchor)}
              onClose={handleNotificationsClose}
              PaperProps={{
                sx: {
                  width: 350,
                  maxWidth: '100%',
                  bgcolor: 'rgba(0, 55, 85, 0.95)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  color: '#ffffff',
                  p: 1,
                },
              }}
            >
              <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 600 }}>
                Notifications (3)
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              {['New offer in Bali', 'Your booking confirmed', 'Special discount'].map((text) => (
                <MenuItem 
                  key={text} 
                  onClick={handleNotificationsClose}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <ListItemText 
                    primary={text} 
                    secondary="2 hours ago"
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.6)' }}
                  />
                </MenuItem>
              ))}
            </Menu>
            
            <Box sx={{ ml: 1 }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#4fc3f7',
                      width: 40,
                      height: 40,
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        transform: 'scale(1.1)',
                        boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.3)',
                      },
                    }}
                  >
                    {currentUser?.firstName?.charAt(0) || 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    width: 240,
                    maxWidth: '100%',
                    bgcolor: 'rgba(0, 55, 85, 0.95)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    color: '#ffffff',
                    p: 1,
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {currentUser?.firstName || 'User'}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                    {currentUser?.email || 'user@example.com'}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                <MenuItem 
                  onClick={handleMenuClose}
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <AccountCircle sx={{ mr: 2, color: '#b3e5fc' }} />
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem 
                  onClick={handleMenuClose}
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <Settings sx={{ mr: 2, color: '#b3e5fc' }} />
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                <MenuItem 
                  onClick={handleLogout} 
                  disabled={isLoggingOut}
                  sx={{
                    borderRadius: 1,
                    color: '#ff6b6b',
                    '&:hover': {
                      bgcolor: 'rgba(255, 107, 107, 0.1)',
                    }
                  }}
                >
                  <Logout sx={{ mr: 2 }} />
                  <ListItemText>{isLoggingOut ? 'Logging Out...' : 'Logout'}</ListItemText>
                </MenuItem>
                {isLoggingOut && <LinearProgress sx={{ mx: 2, bgcolor: 'transparent' }} />}
              </Menu>
            </Box>
          </Box>
        )}
      </Toolbar>
    </GlassAppBar>
  );
};

export default Navbar;