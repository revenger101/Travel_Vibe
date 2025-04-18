import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Box,
  styled,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Fade
} from '@mui/material';
import { Zoom } from '@mui/material';
import { SavedSearch, ArrowRightAlt, PlayCircleOutline } from '@mui/icons-material';

// Add this new styled component for the image transition overlay
const ImageTransitionOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.3)',
  zIndex: 1,
  opacity: 0,
  transition: 'opacity 1s ease-in-out',
  '&.active': {
    opacity: 1,
  },
});

const HeroContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgImage',
})(({ theme, bgImage }) => ({
  position: 'relative',
  height: '90vh',
  minHeight: '600px',
  backgroundImage: `url("${bgImage}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#ffffff',
  overflow: 'hidden',
  transition: 'background-image 1s ease-in-out',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(2, 119, 189, 0.4))',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100px',
    background: 'url("https://www.transparenttextures.com/patterns/wave.png") repeat-x',
    opacity: 0.3,
    zIndex: 1,
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  maxWidth: '1200px',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%',
  },
}));

const MainCTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: '14px 36px',
  borderRadius: '12px',
  background: 'linear-gradient(45deg, #0288d1, #4fc3f7)',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '1.1rem',
  textTransform: 'none',
  boxShadow: '0 4px 20px rgba(2, 119, 189, 0.4)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:hover': {
    background: 'linear-gradient(45deg, #4fc3f7, #0288d1)',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 25px rgba(2, 119, 189, 0.6)',
  },
}));

const SecondaryCTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginLeft: theme.spacing(2),
  padding: '14px 32px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  fontWeight: 500,
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.25)',
    transform: 'translateY(-3px)',
  },
}));

const VideoCTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: '12px 24px',
  borderRadius: '12px',
  background: 'transparent',
  color: '#ffffff',
  fontWeight: 500,
  fontSize: '0.95rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '& .MuiButton-startIcon': {
    transition: 'transform 0.3s ease',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    '& .MuiButton-startIcon': {
      transform: 'scale(1.2)',
    },
  },
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(4),
  maxWidth: '600px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&:hover fieldset': {
      borderColor: '#4fc3f7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0288d1',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    padding: '16px 20px',
    color: '#333',
    fontSize: '1rem',
  },
}));

const ParticleCanvas = styled('canvas')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  opacity: 0.6,
});

const HeroSection = () => {
  const images = [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?auto=format&fit=crop&w=1920&q=80'
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  // Slideshow effect with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setShowOverlay(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setShowOverlay(false);
      }, 1000);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Enhanced particle animation
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connection lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/150})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HeroContainer bgImage={images[currentImage]}>
      <ImageTransitionOverlay className={showOverlay ? 'active' : ''} />
      <ParticleCanvas id="particle-canvas" />
      <HeroContent>
        <Zoom in timeout={800}>
          <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
            <Chip 
              label="New Destinations" 
              color="primary" 
              size="small"
              sx={{ 
                background: 'rgba(2, 136, 209, 0.8)',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)'
              }} 
            />
            <Chip 
              label="Summer 2024" 
              variant="outlined" 
              size="small"
              sx={{ 
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)'
              }} 
            />
          </Stack>
        </Zoom>
        
        <Zoom in timeout={1000}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
              mb: 2,
              lineHeight: 1.2,
              background: 'linear-gradient(45deg, #ffffff, #b3e5fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            Discover Your Next <Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}>Adventure</Box>
          </Typography>
        </Zoom>
        
        <Zoom in timeout={1200}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.6rem' },
              mb: 3,
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Explore exclusive travel deals to breathtaking destinations worldwide and create unforgettable memories.
          </Typography>
        </Zoom>
        
        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          <Zoom in timeout={1400}>
            <MainCTAButton 
              variant="contained" 
              href="#offers"
              endIcon={<ArrowRightAlt sx={{ fontSize: '1.5rem' }} />}
            >
              Explore Offers
            </MainCTAButton>
          </Zoom>
          <Zoom in timeout={1500}>
            <SecondaryCTAButton variant="outlined">
              Customize Trip
            </SecondaryCTAButton>
          </Zoom>
          <Zoom in timeout={1600}>
            <VideoCTAButton
              startIcon={<PlayCircleOutline sx={{ fontSize: '1.8rem' }} />}
            >
              Watch Story
            </VideoCTAButton>
          </Zoom>
        </Box>
        
        <Zoom in timeout={1800}>
          <Box sx={{ position: 'relative', mt: 4 }}>
            <SearchBar
              placeholder="Search destinations, activities, or experiences..."
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SavedSearch sx={{ color: '#0288d1', fontSize: '1.5rem' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Fade in timeout={2200}>
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  mt: 1, 
                  color: 'rgba(255, 255, 255, 0.7)',
                  textAlign: 'center'
                }}
              >
                Popular searches: Bali, Paris, Safari, Ski Resorts
              </Typography>
            </Fade>
          </Box>
        </Zoom>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;