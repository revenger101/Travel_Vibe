import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  TextField,
  Button,
  Grid,
  styled,
  IconButton,
  Divider,
} from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #002f4b, #005f6b)',
  color: '#ffffff',
  padding: theme.spacing(8, 0),
  borderTop: '6px solid #0288d1',
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.25rem',
  marginBottom: theme.spacing(2),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#e0f7fa',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#ffffff',
    textDecoration: 'underline',
  },
}));

const NewsletterButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  borderRadius: 10,
  background: '#0288d1',
  color: '#ffffff',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#0277bd',
    transform: 'translateY(-1px)',
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  background: 'rgba(255, 255, 255, 0.1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.3s ease',
}));

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter Signup:', email);
    setEmail('');
  };

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <FooterTitle>TravelVibe</FooterTitle>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Plan your dream vacation with our exclusive travel deals, personalized services, and expert guidance.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
              <SocialIconButton href="https://facebook.com">
                <Facebook />
              </SocialIconButton>
              <SocialIconButton href="https://twitter.com">
                <Twitter />
              </SocialIconButton>
              <SocialIconButton href="https://instagram.com">
                <Instagram />
              </SocialIconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterTitle>Quick Links</FooterTitle>
            <Box display="flex" flexDirection="column" gap={1}>
              <FooterLink href="#offers">Travel Offers</FooterLink>
              <FooterLink href="#contact">Contact Us</FooterLink>
              <FooterLink href="/home">Home</FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterTitle>Newsletter</FooterTitle>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 2 }}>
              Subscribe to our newsletter and never miss an update on the best travel destinations.
            </Typography>
            <form onSubmit={handleNewsletterSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                variant="filled"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  input: { color: '#ffffff' },
                  label: { color: '#cfd8dc' },
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 10,
                  '& .MuiFilledInput-root': {
                    borderRadius: 10,
                    backgroundColor: 'transparent',
                    '&:before': { borderBottom: '1px solid rgba(255,255,255,0.3)' },
                    '&:hover:before': { borderBottom: '1px solid #ffffff' },
                  },
                }}
              />
              <NewsletterButton type="submit" variant="contained" fullWidth>
                Subscribe
              </NewsletterButton>
            </form>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        <Box textAlign="center">
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © {new Date().getFullYear()} TravelVibe. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
