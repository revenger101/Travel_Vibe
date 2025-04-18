import React from 'react';
import { Box, styled } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import TravelOffers from '../Components/TravelOffers';
import ContactSection from '../Components/ContactSection';
import Footer from '../Components/Footer';
import { Flight } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0277bd',
      dark: '#01579b',
    },
    secondary: {
      main: '#90a4ae',
    },
    background: {
      default: '#e3f2fd',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      color: '#01579b',
      background: 'linear-gradient(45deg, #0288d1, #4fc3f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle1: {
      color: '#455a64',
      fontWeight: 400,
    },
    body2: {
      color: '#607d8b',
      fontWeight: 400,
    },
  },
});

const BackgroundContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #0288d1 0%, #4fc3f7 50%, #e3f2fd 100%)',
  overflow: 'hidden',
  zIndex: -1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png") repeat',
    opacity: 0.1,
  },
}));

const AirplaneAnimation = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '20%',
  left: '-50px',
  animation: 'fly 20s linear infinite',
  '@keyframes fly': {
    '0%': { transform: 'translate(0, 0) rotate(45deg)' },
    '100%': { transform: 'translate(150vw, 50vh) rotate(45deg)' },
  },
}));

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <BackgroundContainer>
        <AirplaneAnimation>
          <Flight sx={{ fontSize: 32, color: 'white', opacity: 0.5 }} />
        </AirplaneAnimation>
      </BackgroundContainer>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <TravelOffers />
        <ContactSection />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Home;