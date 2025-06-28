import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Button,
  Chip,
  Alert,
  Collapse
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon,
  BugReport as BugReportIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

import { motion, AnimatePresence } from 'framer-motion';

const plants = [
  {
    id: 'apple',
    name: 'Apple',
    image: '/images/plants/apple.svg',
    diseases: ['Apple scab', 'Black rot', 'Cedar apple rust'],
    color: '#ff6b6b'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    image: '/images/plants/tomato.svg',
    diseases: ['Early blight', 'Late blight', 'Leaf Mold', 'Bacterial spot'],
    color: '#ff7675'
  },
  {
    id: 'potato',
    name: 'Potato',
    image: '/images/plants/potato.svg',
    diseases: ['Early blight', 'Late blight'],
    color: '#fdcb6e'
  },
  {
    id: 'corn',
    name: 'Corn',
    image: '/images/plants/corn.svg',
    diseases: ['Cercospora leaf spot', 'Common rust', 'Northern Leaf Blight'],
    color: '#f39c12'
  },
  {
    id: 'grape',
    name: 'Grape',
    image: '/images/plants/grape.svg',
    diseases: ['Black rot', 'Esca', 'Leaf blight'],
    color: '#a29bfe'
  },
  {
    id: 'pepper',
    name: 'Pepper',
    image: '/images/plants/pepper.svg',
    diseases: ['Bacterial spot'],
    color: '#00b894'
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    image: '/images/plants/strawberry.svg',
    diseases: ['Leaf scorch', 'Gray mold'],
    color: '#ff7675'
  },
  {
    id: 'cherry',
    name: 'Cherry',
    image: '/images/plants/cherry.svg',
    diseases: ['Powdery mildew', 'Brown rot'],
    color: '#d63031'
  }
];

function HomePage() {
  const [selectedPlant, setSelectedPlant] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDebug, setShowDebug] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResults(null);
      setError('');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const analyzeImage = async () => {
    if (!uploadedImage) {
      setError('Please upload an image first');
      return;
    }

    setLoading(true);
    setResults(null);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', uploadedImage);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError('Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getHealthIcon = (disease) => {
    if (disease.toLowerCase().includes('healthy')) {
      return <CheckCircleIcon sx={{ color: 'success.main', fontSize: 30 }} />;
    }
    return <WarningIcon sx={{ color: 'warning.main', fontSize: 30 }} />;
  };

  const formatConfidence = (confidence) => {
    return Math.round(confidence * 100);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
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
              mb: 2,
            }}
          >
            🌱 Plant Disease Detection
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: 600, mx: 'auto' }}
          >
            AI-powered plant health analysis for better crop management
          </Typography>
        </Box>
      </motion.div>

      {/* Plant Selection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box className="glass-card" sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom textAlign="center" color="primary">
            Select Your Plant
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            {plants.map((plant) => (
              <Grid item xs={6} sm={4} md={2} key={plant.id}>
                <Card
                  className={`plant-card ${selectedPlant === plant.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPlant(plant.id)}
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                  }}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="plant-image"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginBottom: 10,
                    }}
                  />
                  <Typography variant="h6" textAlign="center" gutterBottom>
                    {plant.name}
                  </Typography>
                  <Chip
                    label={`${plant.diseases.length} diseases`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>

      {/* Image Upload */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Box className="upload-container">
          <Typography variant="h4" gutterBottom textAlign="center" color="primary">
            Upload Plant Image
          </Typography>
          
          {!imagePreview ? (
            <Box
              {...getRootProps()}
              className={`upload-area ${isDragActive ? 'dragover' : ''}`}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                or click to select (JPG, PNG, GIF - max 10MB)
              </Typography>
              <Button
                variant="outlined"
                startIcon={<PhotoCameraIcon />}
                size="large"
              >
                Choose File
              </Button>
            </Box>
          ) : (
            <Box className="preview-container">
              <img
                src={imagePreview}
                alt="Preview"
                className="preview-image"
                style={{ maxHeight: 300, borderRadius: 20 }}
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setImagePreview(null);
                    setUploadedImage(null);
                    setResults(null);
                  }}
                  startIcon={<PhotoCameraIcon />}
                >
                  Change Image
                </Button>
                <Button
                  variant="contained"
                  onClick={analyzeImage}
                  disabled={loading}
                  startIcon={loading ? null : <BugReportIcon />}
                  size="large"
                  sx={{
                    minWidth: 160,
                    background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #388E3C, #66BB6A)',
                    },
                  }}
                >
                  {loading ? (
                    <Box className="loading-spinner" sx={{ width: 24, height: 24 }} />
                  ) : (
                    '🎯 Predict Disease'
                  )}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
            {error}
          </Alert>
        </motion.div>
      )}

      {/* Results Display */}
      <AnimatePresence>
        {results && !results.error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            <Box className="result-container">
              <Typography variant="h4" gutterBottom textAlign="center" color="primary">
                🔬 Analysis Results
              </Typography>

              {/* Main Result */}
              <Box className="result-main">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {getHealthIcon(results.prediction.disease)}
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {results.prediction.disease}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                  Plant: {results.prediction.plant}
                </Typography>

                <Box className="confidence-display">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Confidence</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {formatConfidence(results.prediction.confidence)}%
                    </Typography>
                  </Box>
                  <Box className="confidence-bar">
                    <Box
                      className="confidence-fill"
                      sx={{ width: `${formatConfidence(results.prediction.confidence)}%` }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Top Predictions */}
              {results.top_predictions && results.top_predictions.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
                    📊 Top Predictions
                  </Typography>

                  <Grid container spacing={2}>
                    {results.top_predictions.map((pred, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Card
                          sx={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(15px)',
                            borderRadius: 3,
                            border: index === 0 ? '2px solid #4CAF50' : '1px solid rgba(76, 175, 80, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 8px 25px rgba(76, 175, 80, 0.2)',
                            },
                          }}
                        >
                          <Box sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  background: index === 0 ? 'linear-gradient(45deg, #4CAF50, #81C784)' : 'linear-gradient(45deg, #9E9E9E, #BDBDBD)',
                                  backgroundClip: 'text',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  fontWeight: 700,
                                }}
                              >
                                #{index + 1}
                              </Typography>
                              {getHealthIcon(pred.disease)}
                            </Box>

                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                              {pred.disease}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              Plant: {pred.plant}
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Confidence</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {formatConfidence(pred.confidence)}%
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                  overflow: 'hidden',
                                }}
                              >
                                <Box
                                  sx={{
                                    height: '100%',
                                    width: `${formatConfidence(pred.confidence)}%`,
                                    background: pred.disease.toLowerCase().includes('healthy')
                                      ? 'linear-gradient(90deg, #4CAF50, #81C784)'
                                      : 'linear-gradient(90deg, #FF9800, #FFB74D)',
                                    borderRadius: 4,
                                    transition: 'width 0.8s ease',
                                  }}
                                />
                              </Box>
                            </Box>

                            <Chip
                              label={pred.disease.toLowerCase().includes('healthy') ? 'Healthy' : 'Disease Detected'}
                              color={pred.disease.toLowerCase().includes('healthy') ? 'success' : 'warning'}
                              size="small"
                              sx={{ fontWeight: 500 }}
                            />
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Treatment Recommendations */}
              {results.prediction && !results.prediction.disease.toLowerCase().includes('healthy') && (
                <Box sx={{ mt: 3 }}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 183, 77, 0.1))',
                      border: '1px solid rgba(255, 152, 0, 0.3)',
                      borderRadius: 3,
                    }}
                  >
                    <Box sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        💊 Treatment Recommendations
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        • Remove affected plant parts immediately
                        • Apply appropriate fungicide or bactericide
                        • Improve air circulation around plants
                        • Avoid overhead watering
                        • Monitor other plants for similar symptoms
                      </Typography>
                    </Box>
                  </Card>
                </Box>
              )}

              {/* Debug Panel */}
              <Box sx={{ mt: 3 }}>
                <Button
                  onClick={() => setShowDebug(!showDebug)}
                  endIcon={showDebug ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 3 }}
                >
                  🔧 Debug Info
                </Button>
                <Collapse in={showDebug}>
                  <Box
                    sx={{
                      mt: 2,
                      p: 3,
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      borderRadius: 3,
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      maxHeight: 400,
                      overflow: 'auto',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(results, null, 2)}
                    </pre>
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default HomePage;
