import React, { useState, useRef } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  styled,
  Container,
  Modal,
  Chip,
  IconButton,
  Divider,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  Zoom,
  ListItemText
} from '@mui/material';
import { 
  Close,
  Flight,
  Hotel,
  Restaurant,
  LocalActivity,
  Favorite,
  Share,
  CalendarToday,
  People,
  Star,
  ArrowBackIos,
  ArrowForwardIos
} from '@mui/icons-material';

const OfferCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.95)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
    '& .offer-image': {
      transform: 'scale(1.05)',
    },
  },
}));

const OfferButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  borderRadius: 12,
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: '#ffffff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
}));

const DetailModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 900,
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  outline: 'none',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '3px',
  },
}));

const ScrollButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: theme.palette.primary.main,
  zIndex: 1,
  width: 48,
  height: 48,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}));

const offers = [
  {
    id: 1,
    title: 'Paris Romantic Getaway',
    description: 'Experience the magic of Paris with this all-inclusive package.',
    price: '$1,299',
    discountPrice: '$999',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 124,
    duration: '5 nights',
    includes: [
      'Round-trip flights',
      '4-star hotel accommodation',
      'Daily breakfast',
      'City tour with guide',
      'Eiffel Tower skip-the-line tickets',
      'River Seine cruise'
    ],
    highlights: [
      'Visit Louvre Museum',
      'Explore Montmartre',
      'Champagne dinner cruise',
      'Shopping at Champs-Élysées'
    ],
    tags: ['Romantic', 'Cultural', 'City']
  },
  {
    id: 2,
    title: 'Bali Tropical Paradise',
    description: 'Luxury resort stay with private beach access and spa treatments.',
    price: '$1,799',
    discountPrice: '$1,499',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 98,
    duration: '7 nights',
    includes: [
      'Round-trip flights',
      'Luxury villa with private pool',
      'Daily breakfast and dinner',
      'Airport transfers',
      '3 spa treatments',
      'Balinese cooking class'
    ],
    highlights: [
      'Ubud monkey forest',
      'Tegallalang Rice Terrace',
      'Uluwatu Temple visit',
      'Beachfront dining'
    ],
    tags: ['Beach', 'Luxury', 'Wellness']
  },
  {
    id: 3,
    title: 'New York City Break',
    description: 'Fast-paced adventure in the city that never sleeps.',
    price: '$899',
    discountPrice: '$749',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 156,
    duration: '3 nights',
    includes: [
      'Round-trip flights',
      'Boutique hotel in Manhattan',
      'Hop-on hop-off bus tour',
      'Statue of Liberty tickets',
      'Broadway show tickets'
    ],
    highlights: [
      'Times Square exploration',
      'Central Park bike tour',
      'Top of the Rock observation',
      'Museum of Modern Art'
    ],
    tags: ['City', 'Shopping', 'Cultural']
  },
  {
    id: 4,
    title: 'Tunisian Desert Adventure',
    description: 'Explore the golden sands and ancient cities of Tunisia.',
    price: '$1,499',
    discountPrice: '$1,199',
    image: 'https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 92,
    duration: '6 nights',
    includes: [
      'Round-trip flights',
      'Luxury desert camp',
      'All meals included',
      'Camel trekking experience',
      'Ancient city tours',
      'Star-gazing experience'
    ],
    highlights: [
      'Sahara Desert exploration',
      'Visit to Matmata underground homes',
      'Djerba Island tour',
      'Traditional Tunisian cuisine'
    ],
    tags: ['Adventure', 'Desert', 'Cultural']
  },
  {
    id: 5,
    title: 'Tokyo Adventure',
    description: 'Discover the perfect blend of tradition and modernity.',
    price: '$1,899',
    discountPrice: '$1,599',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 112,
    duration: '7 nights',
    includes: [
      'Round-trip flights',
      '4-star hotel in Shinjuku',
      'JR Pass for 7 days',
      'Traditional tea ceremony',
      'Tsukiji market tour',
      'Sumo wrestling tickets'
    ],
    highlights: [
      'Shibuya Crossing',
      'Asakusa Temple visit',
      'Akihabara exploration',
      'Mount Fuji day trip'
    ],
    tags: ['Cultural', 'Adventure', 'City']
  },
  {
    id: 6,
    title: 'Safari in Serengeti',
    description: 'Witness the great migration in this once-in-a-lifetime experience.',
    price: '$3,499',
    discountPrice: '$2,999',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviews: 65,
    duration: '8 nights',
    includes: [
      'Round-trip flights',
      'Luxury tented camps',
      'All meals and drinks',
      'Daily game drives',
      'Hot air balloon safari',
      'Professional guide'
    ],
    highlights: [
      'Great Migration viewing',
      'Ngorongoro Crater',
      'Maasai village visit',
      'Sunset wildlife spotting'
    ],
    tags: ['Adventure', 'Wildlife', 'Luxury']
  }
];

const TravelOffers = () => {
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const scrollContainerRef = useRef(null);

  const handleOpen = (offer) => {
    setSelectedOffer(offer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box id="offers" sx={{ 
      py: 10, 
      background: 'linear-gradient(180deg, rgba(247,249,252,1) 0%, rgba(240,243,247,1) 100%)',
      position: 'relative'
    }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' }, 
            mb: 2,
            fontWeight: 800,
            background: 'linear-gradient(45deg, #0288d1, #4fc3f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Exclusive Travel Offers
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ 
            mb: 6,
            color: 'text.secondary',
            maxWidth: 700,
            mx: 'auto',
            fontSize: '1.2rem'
          }}
        >
          Discover our handpicked selection of premium travel experiences at unbeatable prices
        </Typography>
        
        <Box sx={{ position: 'relative' }}>
          <ScrollButton 
            onClick={scrollLeft} 
            sx={{ left: { xs: 8, sm: 16 } }}
            aria-label="Scroll left"
          >
            <ArrowBackIos />
          </ScrollButton>
          
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              gap: 4,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              py: 2,
              px: { xs: 2, sm: 4 },
            }}
          >
            {offers.map((offer, index) => (
              <Box 
                key={offer.id} 
                sx={{ 
                  minWidth: { xs: 280, sm: 320, md: 360 },
                  flexShrink: 0,
                }}
              >
                <Zoom in timeout={500 + index * 200}>
                  <OfferCard>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        className="offer-image"
                        component="img"
                        height="240"
                        image={offer.image}
                        alt={offer.title}
                        sx={{ 
                          borderRadius: '16px 16px 0 0',
                          transition: 'transform 0.5s ease',
                        }}
                      />
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 16, 
                        left: 16,
                        display: 'flex',
                        gap: 1
                      }}>
                        {offer.tags.map(tag => (
                          <Chip 
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(255,255,255,0.9)',
                              fontWeight: 600,
                              fontSize: '0.7rem'
                            }}
                          />
                        ))}
                      </Box>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,1)',
                          }
                        }}
                      >
                        <Favorite sx={{ color: 'error.main' }} />
                      </IconButton>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {offer.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Star sx={{ color: 'warning.main', fontSize: '1.2rem', mr: 0.5 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {offer.rating}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ({offer.reviews})
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {offer.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CalendarToday sx={{ fontSize: '1rem', mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ mr: 2 }}>
                          {offer.duration}
                        </Typography>
                        <People sx={{ fontSize: '1rem', mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          2 Adults
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 'auto' }}>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mr: 2 }}>
                          {offer.discountPrice}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                          {offer.price}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <OfferButton 
                          variant="contained" 
                          fullWidth
                          onClick={() => handleOpen(offer)}
                        >
                          View Details
                        </OfferButton>
                      </Box>
                    </CardContent>
                  </OfferCard>
                </Zoom>
              </Box>
            ))}
          </Box>
          
          <ScrollButton 
            onClick={scrollRight} 
            sx={{ right: { xs: 8, sm: 16 } }}
            aria-label="Scroll right"
          >
            <ArrowForwardIos />
          </ScrollButton>
        </Box>

        {/* Offer Details Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="offer-details-modal"
          aria-describedby="offer-details-description"
        >
          <DetailModal>
            {selectedOffer && (
              <>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: 'text.secondary',
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Close />
                </IconButton>
                
                <Grid container spacing={4}>
                  <Grid item md={6}>
                    <Box sx={{ 
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: '100%',
                      position: 'relative'
                    }}>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={selectedOffer.image}
                        alt={selectedOffer.title}
                        sx={{ 
                          minHeight: 300,
                          objectFit: 'cover',
                        }}
                      />
                      <Box sx={{ 
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        right: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {selectedOffer.tags.map(tag => (
                            <Chip 
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{ 
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                fontWeight: 600,
                                fontSize: '0.7rem'
                              }}
                            />
                          ))}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                            <Share fontSize="small" />
                          </IconButton>
                          <IconButton sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                            <Favorite fontSize="small" color="error" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={6}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                      {selectedOffer.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Rating 
                        value={selectedOffer.rating} 
                        precision={0.1} 
                        readOnly 
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
                        {selectedOffer.rating}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        ({selectedOffer.reviews} reviews)
                      </Typography>
                    </Box>
                    
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {selectedOffer.description}
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        Package Includes:
                      </Typography>
                      <List dense sx={{ py: 0 }}>
                        {selectedOffer.includes.map((item, index) => (
                          <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              {index % 4 === 0 ? <Flight fontSize="small" /> :
                               index % 4 === 1 ? <Hotel fontSize="small" /> :
                               index % 4 === 2 ? <Restaurant fontSize="small" /> :
                               <LocalActivity fontSize="small" />}
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        Trip Highlights:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {selectedOffer.highlights.map((highlight, index) => (
                          <Chip 
                            key={index}
                            label={highlight}
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(2, 136, 209, 0.1)',
                              color: 'primary.main'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                    
                    <Box sx={{ 
                      backgroundColor: 'rgba(2, 136, 209, 0.05)',
                      borderRadius: 2,
                      p: 3,
                      mb: 3
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body1">
                          <Box component="span" sx={{ fontWeight: 600 }}>Duration:</Box> {selectedOffer.duration}
                        </Typography>
                        <Typography variant="body1">
                          <Box component="span" sx={{ fontWeight: 600 }}>Group Size:</Box> 2 Adults
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Typography variant="h4" color="primary" sx={{ fontWeight: 800, mr: 2 }}>
                          {selectedOffer.discountPrice}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                          {selectedOffer.price}
                        </Typography>
                        <Chip 
                          label="25% OFF"
                          color="error"
                          size="small"
                          sx={{ 
                            ml: 2,
                            fontWeight: 700,
                            fontSize: '0.75rem'
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(45deg, #0288d1, #4fc3f7)',
                        boxShadow: '0 4px 12px rgba(2, 119, 189, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(2, 119, 189, 0.4)',
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </DetailModal>
        </Modal>
      </Container>
    </Box>
  );
};

export default TravelOffers;