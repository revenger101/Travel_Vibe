import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Fade,
  Zoom,
  CircularProgress,
  styled,
} from '@mui/material';
import { Flight, ErrorOutline } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          padding: '12px 24px',
          transition: 'transform 0.2s, filter 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            filter: 'brightness(1.1)',
          },
        },
        contained: {
          boxShadow: '0 6px 14px rgba(2, 119, 189, 0.3)',
          '&:hover': {
            boxShadow: '0 8px 20px rgba(2, 119, 189, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'box-shadow 0.3s',
            '&:hover fieldset': {
              borderColor: '#0288d1',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 8px rgba(2, 119, 189, 0.3)',
            },
          },
          '& .MuiInputLabel-root': {
            transition: 'transform 0.2s, color 0.2s',
          },
        },
      },
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

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setSuccessMessage('');
    try {
      console.log('Password Reset Request:', formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage('A password reset link has been sent to your email.');
      setFormData({ email: '' });
    } catch (error) {
      setErrors({ general: 'Failed to send reset link. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BackgroundContainer>
        <AirplaneAnimation>
          <Flight sx={{ fontSize: 32, color: 'white', opacity: 0.5 }} />
        </AirplaneAnimation>
      </BackgroundContainer>
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <Fade in timeout={1000}>
          <Card>
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <Box display="flex" justifyContent="center" mb={4}>
                <Zoom in timeout={800}>
                  <Flight sx={{ fontSize: 56, color: 'primary.main', transform: 'rotate(45deg)' }} />
                </Zoom>
              </Box>
              <Typography variant="h3" align="center" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }}>
                Reset Password
              </Typography>
              <Typography variant="subtitle1" align="center" mb={5}>
                Enter your email to receive a password reset link
              </Typography>
              <TransitionGroup>
                <CSSTransition timeout={300} classNames="fade">
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={
                        errors.email && (
                          <Box display="flex" alignItems="center" gap={1}>
                            <ErrorOutline fontSize="small" />
                            {errors.email}
                          </Box>
                        )
                      }
                      margin="normal"
                      variant="outlined"
                      sx={{ mb: 3 }}
                    />
                    {errors.general && (
                      <Typography color="error" variant="body2" align="center" mb={2}>
                        {errors.general}
                      </Typography>
                    )}
                    {successMessage && (
                      <Typography color="primary" variant="body2" align="center" mb={2}>
                        {successMessage}
                      </Typography>
                    )}
                    <Box mt={4}>
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                      </Button>
                    </Box>
                  </form>
                </CSSTransition>
                <CSSTransition timeout={300} classNames="fade">
                  <Box mt={4} textAlign="center">
                    <Typography variant="body2">
                      Remember your password?{' '}
                      <Link to="/" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                        <span style={{ '&:hover': { textDecoration: 'underline' } }}>Sign In</span>
                      </Link>
                    </Typography>
                  </Box>
                </CSSTransition>
              </TransitionGroup>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;