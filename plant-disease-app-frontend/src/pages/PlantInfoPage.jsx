import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Tab,
  Tabs,
  Paper
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  Shield as ShieldIcon,
  LocalHospital as LocalHospitalIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const plantsData = [
  {
    id: 'apple',
    name: 'Apple',
    image: '/images/plants/apple.svg',
    description: 'Apples are one of the most widely cultivated tree fruits. They are susceptible to various diseases that can affect fruit quality and yield.',
    diseases: [
      {
        name: 'Apple Scab',
        symptoms: 'Dark, scaly lesions on leaves and fruit. Leaves may yellow and drop prematurely.',
        prevention: 'Plant resistant varieties, ensure good air circulation, remove fallen leaves.',
        cure: 'Apply fungicides during early spring. Remove infected plant material.',
        severity: 'High'
      },
      {
        name: 'Black Rot',
        symptoms: 'Brown to black circular spots on fruit, concentric rings on leaves.',
        prevention: 'Prune for air circulation, avoid overhead watering, clean up debris.',
        cure: 'Remove infected fruit and branches. Apply copper-based fungicides.',
        severity: 'Medium'
      },
      {
        name: 'Cedar Apple Rust',
        symptoms: 'Orange spots on leaves, yellow lesions that develop into cup-shaped structures.',
        prevention: 'Remove nearby cedar trees, plant resistant varieties.',
        cure: 'Apply fungicides in early spring. Remove infected leaves.',
        severity: 'Medium'
      }
    ]
  },
  {
    id: 'tomato',
    name: 'Tomato',
    image: '/images/plants/tomato.svg',
    description: 'Tomatoes are popular garden vegetables that can be affected by various fungal, bacterial, and viral diseases.',
    diseases: [
      {
        name: 'Early Blight',
        symptoms: 'Dark spots with concentric rings on older leaves, yellowing and dropping of leaves.',
        prevention: 'Rotate crops, mulch around plants, avoid overhead watering.',
        cure: 'Remove affected leaves, apply fungicides, improve air circulation.',
        severity: 'High'
      },
      {
        name: 'Late Blight',
        symptoms: 'Water-soaked spots on leaves that turn brown, white fuzzy growth on leaf undersides.',
        prevention: 'Plant resistant varieties, ensure good drainage, avoid wet conditions.',
        cure: 'Remove infected plants immediately, apply copper fungicides.',
        severity: 'Very High'
      },
      {
        name: 'Bacterial Spot',
        symptoms: 'Small, dark spots on leaves and fruit, yellowing around spots.',
        prevention: 'Use disease-free seeds, avoid overhead watering, rotate crops.',
        cure: 'Apply copper-based bactericides, remove infected plant material.',
        severity: 'Medium'
      }
    ]
  },
  {
    id: 'potato',
    name: 'Potato',
    image: '/images/plants/potato.svg',
    description: 'Potatoes are important food crops that can suffer from various diseases affecting both foliage and tubers.',
    diseases: [
      {
        name: 'Early Blight',
        symptoms: 'Dark lesions with concentric rings on leaves, starting from lower leaves.',
        prevention: 'Rotate crops, plant certified seed potatoes, maintain proper spacing.',
        cure: 'Apply fungicides, remove infected foliage, harvest early if needed.',
        severity: 'High'
      },
      {
        name: 'Late Blight',
        symptoms: 'Water-soaked lesions on leaves, white growth on undersides, tuber rot.',
        prevention: 'Plant resistant varieties, avoid wet conditions, ensure good drainage.',
        cure: 'Destroy infected plants, apply protective fungicides.',
        severity: 'Very High'
      }
    ]
  },
  {
    id: 'corn',
    name: 'Corn (Maize)',
    image: '/images/plants/corn.svg',
    description: 'Corn is a major cereal grain and one of the most important food crops globally, susceptible to various leaf diseases.',
    diseases: [
      {
        name: 'Cercospora Leaf Spot',
        symptoms: 'Small, rectangular gray spots with dark borders on leaves.',
        prevention: 'Crop rotation, resistant varieties, proper field sanitation.',
        cure: 'Apply fungicides, remove crop residue after harvest.',
        severity: 'Medium'
      },
      {
        name: 'Common Rust',
        symptoms: 'Small, oval, reddish-brown pustules on both leaf surfaces.',
        prevention: 'Plant resistant hybrids, proper spacing for air circulation.',
        cure: 'Apply fungicides if severe, remove infected leaves.',
        severity: 'Medium'
      },
      {
        name: 'Northern Leaf Blight',
        symptoms: 'Large, elliptical gray-green lesions on leaves.',
        prevention: 'Use resistant varieties, crop rotation, bury crop residue.',
        cure: 'Apply fungicides preventively, remove infected plant debris.',
        severity: 'High'
      }
    ]
  },
  {
    id: 'grape',
    name: 'Grape',
    image: '/images/plants/grape.svg',
    description: 'Grapes are cultivated worldwide for fresh consumption and wine production, facing various fungal diseases.',
    diseases: [
      {
        name: 'Black Rot',
        symptoms: 'Circular brown spots on leaves, mummified berries.',
        prevention: 'Prune for air circulation, remove mummified fruit, clean cultivation.',
        cure: 'Apply fungicides during growing season, remove infected plant parts.',
        severity: 'High'
      },
      {
        name: 'Esca (Black Measles)',
        symptoms: 'Tiger stripe pattern on leaves, berry spotting, wood decay.',
        prevention: 'Proper pruning techniques, wound protection, avoid stress.',
        cure: 'Remove infected wood, apply protective fungicides to wounds.',
        severity: 'Very High'
      },
      {
        name: 'Leaf Blight',
        symptoms: 'Brown spots on leaves, premature defoliation.',
        prevention: 'Good air circulation, avoid overhead watering, sanitation.',
        cure: 'Apply fungicides, remove fallen leaves, improve ventilation.',
        severity: 'Medium'
      }
    ]
  },
  {
    id: 'pepper',
    name: 'Bell Pepper',
    image: '/images/plants/pepper.svg',
    description: 'Bell peppers are sweet peppers rich in vitamins, commonly affected by bacterial diseases.',
    diseases: [
      {
        name: 'Bacterial Spot',
        symptoms: 'Small, dark spots on leaves and fruit with yellow halos.',
        prevention: 'Use certified seeds, avoid overhead irrigation, crop rotation.',
        cure: 'Apply copper-based bactericides, remove infected plants.',
        severity: 'High'
      }
    ]
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    image: '/images/plants/strawberry.svg',
    description: 'Strawberries are popular berry fruits rich in vitamin C, susceptible to various leaf diseases.',
    diseases: [
      {
        name: 'Leaf Scorch',
        symptoms: 'Purple to brown spots on leaves, leaf browning and death.',
        prevention: 'Plant resistant varieties, ensure good drainage, avoid overhead watering.',
        cure: 'Remove infected leaves, apply fungicides, improve air circulation.',
        severity: 'Medium'
      },
      {
        name: 'Leaf Spot',
        symptoms: 'Small, circular spots with white centers and purple borders.',
        prevention: 'Avoid overhead watering, proper plant spacing, remove debris.',
        cure: 'Apply fungicides, remove infected foliage, improve ventilation.',
        severity: 'Medium'
      }
    ]
  },
  {
    id: 'cherry',
    name: 'Cherry',
    image: '/images/plants/cherry.svg',
    description: 'Cherries are stone fruits known for their sweet taste, facing various fungal diseases.',
    diseases: [
      {
        name: 'Powdery Mildew',
        symptoms: 'White, powdery coating on leaves and shoots.',
        prevention: 'Plant in sunny locations, ensure air circulation, avoid overhead watering.',
        cure: 'Apply sulfur-based fungicides, prune infected shoots.',
        severity: 'Medium'
      },
      {
        name: 'Leaf Spot',
        symptoms: 'Small, round spots on leaves with yellow halos.',
        prevention: 'Avoid overhead watering, rake fallen leaves, proper spacing.',
        cure: 'Apply copper fungicides, improve air circulation.',
        severity: 'Medium'
      }
    ]
  }
];

function PlantInfoPage() {
  const { t } = useLanguage();
  const [selectedPlant, setSelectedPlant] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const handlePlantChange = (plantIndex) => {
    setSelectedPlant(plantIndex);
    setSelectedTab(0);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Very High': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      default: return 'success';
    }
  };

  const currentPlant = plantsData[selectedPlant];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2E7D32, #4CAF50, #81C784)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            🌿 {t('plantInformation')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('description')}
          </Typography>
        </Box>
      </motion.div>

      {/* Plant Selection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box className="glass-card" sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom color="primary" textAlign="center">
            Select a Plant
          </Typography>
          <Grid container spacing={3}>
            {plantsData.map((plant, index) => (
              <Grid item xs={12} sm={6} md={4} key={plant.id}>
                <Card
                  onClick={() => handlePlantChange(index)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: selectedPlant === index ? '3px solid #4CAF50' : '1px solid transparent',
                    transform: selectedPlant === index ? 'scale(1.05)' : 'scale(1)',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={plant.image}
                    alt={plant.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {plant.name}
                    </Typography>
                    <Chip
                      label={`${plant.diseases.length} diseases`}
                      color="primary"
                      size="small"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>

      {/* Plant Details */}
      <motion.div
        key={selectedPlant}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="glass-card" sx={{ p: 4 }}>
          {/* Plant Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 3 }}>
            <img
              src={currentPlant.image}
              alt={currentPlant.name}
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #4CAF50',
              }}
            />
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <Typography variant="h3" gutterBottom color="primary">
                {currentPlant.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {currentPlant.description}
              </Typography>
            </Box>
          </Box>

          {/* Disease Information */}
          <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
            Common Diseases
          </Typography>

          {currentPlant.diseases.map((disease, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                borderRadius: 2,
                '&:before': { display: 'none' },
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                  borderRadius: 2,
                  '&.Mui-expanded': {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Typography variant="h6" sx={{ flex: 1 }}>
                    {disease.name}
                  </Typography>
                  <Chip
                    label={disease.severity}
                    color={getSeverityColor(disease.severity)}
                    size="small"
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Tabs
                  value={selectedTab}
                  onChange={(e, newValue) => setSelectedTab(newValue)}
                  sx={{ mb: 3 }}
                >
                  <Tab icon={<VisibilityIcon />} label="Symptoms" />
                  <Tab icon={<ShieldIcon />} label="Prevention" />
                  <Tab icon={<LocalHospitalIcon />} label="Treatment" />
                </Tabs>

                <Paper sx={{ p: 3, backgroundColor: 'rgba(76, 175, 80, 0.02)' }}>
                  {selectedTab === 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <WarningIcon color="warning" />
                      <Typography variant="body1">{disease.symptoms}</Typography>
                    </Box>
                  )}
                  {selectedTab === 1 && (
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <ShieldIcon color="primary" />
                      <Typography variant="body1">{disease.prevention}</Typography>
                    </Box>
                  )}
                  {selectedTab === 2 && (
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <LocalHospitalIcon color="success" />
                      <Typography variant="body1">{disease.cure}</Typography>
                    </Box>
                  )}
                </Paper>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
}

export default PlantInfoPage;
