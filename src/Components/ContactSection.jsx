import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  styled,
  Zoom,
  InputAdornment
} from '@mui/material';
import { Send, Person, Email, Subject } from '@mui/icons-material';

const ContactCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: 24,
  padding: theme.spacing(6),
  maxWidth: 650,
  margin: '0 auto',
  boxShadow: '0 18px 44px rgba(0,0,0,0.12)',
  textAlign: 'center',
  backdropFilter: 'blur(10px)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: '14px 36px',
  borderRadius: 12,
  background: 'linear-gradient(90deg, #0288d1, #26c6da)',
  color: '#ffffff',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  boxShadow: '0 4px 12px rgba(2, 119, 189, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(90deg, #26c6da, #0288d1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(2, 119, 189, 0.4)',
  },
}));

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form:', formData);
    // Add API call or toast notification
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 12,
        background: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0, 30, 55, 0.9) 0%, rgba(2,136,209,0.8) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Zoom in timeout={800} style={{ transitionDelay: '100ms' }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3rem' },
                fontWeight: 800,
                color: '#ffffff',
                mb: 2,
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: 600,
                mx: 'auto',
                fontSize: '1.1rem',
              }}
            >
              We'd love to hear from you. Fill out the form and we’ll respond as soon as possible.
            </Typography>
          </Box>
        </Zoom>

        <Zoom in timeout={1000} style={{ transitionDelay: '200ms' }}>
          <ContactCard>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 12 },
                }}
                helperText="Let us know who you are"
              />
              <TextField
                fullWidth
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 12 },
                }}
                helperText="We’ll never share your email."
              />
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Subject color="primary" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 12 },
                }}
              />
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
                sx={{ mb: 3 }}
                InputProps={{
                  sx: { borderRadius: 12 },
                }}
                helperText="Write your message here"
              />
              <SubmitButton
                type="submit"
                variant="contained"
                endIcon={<Send />}
              >
                Send Message
              </SubmitButton>
            </Box>
          </ContactCard>
        </Zoom>
      </Container>
    </Box>
  );
};

export default ContactSection;
