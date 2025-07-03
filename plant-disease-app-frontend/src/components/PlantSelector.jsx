import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const plants = [
  {
    id: 'apple',
    name: 'Apple',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop&crop=center',
    diseases: ['Apple scab', 'Black rot', 'Cedar apple rust']
  },
  {
    id: 'tomato',
    name: 'Tomato',
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=200&h=200&fit=crop&crop=center',
    diseases: ['Early blight', 'Late blight', 'Leaf Mold', 'Bacterial spot']
  },
  {
    id: 'potato',
    name: 'Potato',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop&crop=center',
    diseases: ['Early blight', 'Late blight']
  },
  {
    id: 'corn',
    name: 'Corn',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&h=200&fit=crop&crop=center',
    diseases: ['Cercospora leaf spot', 'Common rust', 'Northern Leaf Blight']
  },
  {
    id: 'grape',
    name: 'Grape',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=200&h=200&fit=crop&crop=center',
    diseases: ['Black rot', 'Esca', 'Leaf blight']
  },
  {
    id: 'pepper',
    name: 'Pepper',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&h=200&fit=crop&crop=center',
    diseases: ['Bacterial spot']
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&fit=crop&crop=center',
    diseases: ['Leaf scorch']
  },
  {
    id: 'cherry',
    name: 'Cherry',
    image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=200&h=200&fit=crop&crop=center',
    diseases: ['Powdery mildew']
  }
];

function PlantSelector({ selectedPlant, onPlantSelect }) {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom textAlign="center" color="white">
        {t('selectPlant')}
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {plants.map((plant) => (
          <Grid item xs={6} sm={4} md={3} key={plant.id}>
            <Card
              className={`plant-card ${selectedPlant === plant.id ? 'selected' : ''}`}
              onClick={() => onPlantSelect(plant.id)}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
                ...(selectedPlant === plant.id && {
                  border: '3px solid #4caf50',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
                })
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  margin: '16px auto 8px',
                  objectFit: 'cover',
                  border: '3px solid #fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                image={plant.image}
                alt={plant.name}
              />
              <CardContent sx={{ textAlign: 'center', pt: 0 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {plant.name}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                  <Chip
                    label={`${plant.diseases.length} diseases`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PlantSelector;
