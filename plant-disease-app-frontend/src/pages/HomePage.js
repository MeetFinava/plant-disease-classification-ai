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
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CardContent
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon,
  BugReport as BugReportIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();
  const [selectedPlant, setSelectedPlant] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDebug, setShowDebug] = useState(false);
  const [showPlantSelectionDialog, setShowPlantSelectionDialog] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!selectedPlant) {
        // Show plant selection dialog if no plant is selected
        setUploadedImage(file);
        setImagePreview(URL.createObjectURL(file));
        setShowPlantSelectionDialog(true);
        return;
      }
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
      // Try to connect to backend API
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const formData = new FormData();
      formData.append('file', uploadedImage);

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Backend API not available, using demo mode:', error);

      // Demo mode - simulate AI prediction
      const demoResults = generateDemoResults();
      setResults(demoResults);
    } finally {
      setLoading(false);
    }
  };

  const generateDemoResults = () => {
    // Simulate intelligent AI prediction based on selected plant
    const selectedPlantData = plants.find(p => p.id === selectedPlant);
    const plantName = selectedPlantData ? selectedPlantData.name : 'Unknown Plant';

    // Generate realistic demo results
    const diseases = [
      { name: 'Healthy', isHealthy: true },
      { name: 'Early Blight', isHealthy: false },
      { name: 'Late Blight', isHealthy: false },
      { name: 'Bacterial Spot', isHealthy: false },
      { name: 'Leaf Mold', isHealthy: false },
      { name: 'Powdery Mildew', isHealthy: false }
    ];

    // Randomly select a disease (70% chance healthy for demo)
    const isHealthy = Math.random() > 0.3;
    const selectedDisease = isHealthy
      ? diseases[0]
      : diseases[Math.floor(Math.random() * (diseases.length - 1)) + 1];

    const confidence = isHealthy
      ? 0.85 + Math.random() * 0.1
      : 0.75 + Math.random() * 0.15;

    // Generate top 3 predictions
    const topPredictions = [
      {
        plant: plantName,
        disease: selectedDisease.name,
        confidence: confidence,
        class_name: `${plantName.toLowerCase()}___${selectedDisease.name.toLowerCase().replace(' ', '_')}`
      }
    ];

    // Add 2 more predictions with lower confidence
    const otherDiseases = diseases.filter(d => d.name !== selectedDisease.name);
    for (let i = 0; i < 2 && i < otherDiseases.length; i++) {
      const disease = otherDiseases[i];
      topPredictions.push({
        plant: plantName,
        disease: disease.name,
        confidence: confidence - (0.1 + Math.random() * 0.2),
        class_name: `${plantName.toLowerCase()}___${disease.name.toLowerCase().replace(' ', '_')}`
      });
    }

    return {
      prediction: topPredictions[0],
      top_predictions: topPredictions,
      demo_mode: true,
      message: "Demo mode - Connect backend API for real AI predictions"
    };
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

  const getAccuracyLabel = (confidence) => {
    if (confidence >= 0.90) return "Very High Confidence";
    if (confidence >= 0.80) return "High Confidence";
    if (confidence >= 0.70) return "Good Confidence";
    if (confidence >= 0.60) return "Moderate Confidence";
    if (confidence >= 0.50) return "Low Confidence";
    return "Very Low Confidence";
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
            🌱 {t('title')}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: 600, mx: 'auto' }}
          >
            {t('subtitle')}
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
            {t('selectPlant')}
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
                {isDragActive ? t('dragDropActive') : t('dragDropText')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {t('supportedFormats')}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<PhotoCameraIcon />}
                size="large"
              >
                {t('uploadButton')}
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
                  {t('uploadButton')}
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
                    `🎯 ${t('analyzeImage')}`
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
                🔬 {t('analysisResults')}
              </Typography>

              {/* Demo Mode Indicator */}
              {results.demo_mode && (
                <Alert
                  severity="info"
                  sx={{
                    mb: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(100, 181, 246, 0.1))'
                  }}
                >
                  <strong>🎭 {t('demoMode')}:</strong> {t('demoModeDescription')}
                </Alert>
              )}

              {/* Main Result */}
              <Box className="result-main">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {getHealthIcon(results.prediction.disease)}
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {results.prediction.disease}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                  {t('plantType')}: {results.prediction.plant}
                </Typography>

                <Box className="confidence-display">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">{t('confidenceScore')}</Typography>
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

              {/* Enhanced Top 3 Predictions */}
              {results.top_predictions && results.top_predictions.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                      🏆 {t('topPredictions')}
                    </Typography>
                    {results.model_version && (
                      <Chip
                        label={`Model: ${results.model_version}`}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Box>

                  {/* Image Analysis Info */}
                  {results.image_analysis && (
                    <Alert
                      severity="info"
                      sx={{
                        mb: 3,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(100, 181, 246, 0.1))'
                      }}
                    >
                      <strong>🔍 {t('imageAnalysis')}:</strong> {t('resolution')}: {results.image_analysis.resolution},
                      {t('greenRatio')}: {(results.image_analysis.green_ratio * 100).toFixed(1)}%,
                      {t('brightness')}: {results.image_analysis.brightness}
                    </Alert>
                  )}

                  <Grid container spacing={3}>
                    {results.top_predictions.slice(0, 3).map((pred, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Card
                          sx={{
                            background: index === 0
                              ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(129, 199, 132, 0.1))'
                              : index === 1
                              ? 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 183, 77, 0.05))'
                              : 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(239, 83, 80, 0.05))',
                            backdropFilter: 'blur(15px)',
                            borderRadius: 4,
                            border: index === 0
                              ? '2px solid #4CAF50'
                              : index === 1
                              ? '2px solid #FF9800'
                              : '1px solid rgba(255, 255, 255, 0.3)',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'visible',
                            '&:hover': {
                              transform: 'translateY(-8px)',
                              boxShadow: index === 0
                                ? '0 15px 40px rgba(76, 175, 80, 0.3)'
                                : '0 15px 40px rgba(0,0,0,0.2)',
                            },
                          }}
                        >
                          {/* Rank Badge */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: -12,
                              right: -12,
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              background: index === 0
                                ? 'linear-gradient(135deg, #FFD700, #FFA000)'
                                : index === 1
                                ? 'linear-gradient(135deg, #C0C0C0, #9E9E9E)'
                                : 'linear-gradient(135deg, #CD7F32, #8D6E63)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              fontWeight: 'bold',
                              color: 'white',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                              zIndex: 1
                            }}
                          >
                            {index + 1}
                          </Box>

                          <Box sx={{ p: 3, pt: 4 }}>
                            {/* Header */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                                {index === 0 ? `🥇 ${t('bestMatch')}` : index === 1 ? `🥈 ${t('alternative')}` : `🥉 ${t('possible')}`}
                              </Typography>
                            </Box>

                            {/* Plant Type */}
                            <Box sx={{ mb: 2, p: 2, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                {t('plantType')}
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                                🌱 {pred.plant}
                              </Typography>
                            </Box>

                            {/* Disease/Condition */}
                            <Box sx={{ mb: 3, p: 2, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                {t('condition')}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  color: pred.disease.toLowerCase().includes('healthy') ? '#4CAF50' : '#FF7043',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1
                                }}
                              >
                                {pred.disease.toLowerCase().includes('healthy') ? '✅' : '⚠️'}
                                {pred.disease}
                              </Typography>
                            </Box>

                            {/* Confidence Score */}
                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                  {t('confidenceScore')}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                  {formatConfidence(pred.confidence)}%
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  height: 10,
                                  borderRadius: 5,
                                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                  overflow: 'hidden',
                                }}
                              >
                                <Box
                                  sx={{
                                    height: '100%',
                                    width: `${formatConfidence(pred.confidence)}%`,
                                    background: pred.confidence >= 0.8
                                      ? 'linear-gradient(90deg, #4CAF50, #81C784)'
                                      : pred.confidence >= 0.6
                                      ? 'linear-gradient(90deg, #FF9800, #FFB74D)'
                                      : 'linear-gradient(90deg, #F44336, #EF5350)',
                                    borderRadius: 5,
                                    transition: 'width 0.8s ease',
                                  }}
                                />
                              </Box>
                            </Box>

                            {/* Accuracy Label */}
                            <Box sx={{ textAlign: 'center' }}>
                              <Chip
                                label={pred.accuracy_label || getAccuracyLabel(pred.confidence)}
                                size="small"
                                sx={{
                                  fontWeight: 600,
                                  backgroundColor: pred.confidence >= 0.8
                                    ? 'rgba(76, 175, 80, 0.2)'
                                    : pred.confidence >= 0.6
                                    ? 'rgba(255, 152, 0, 0.2)'
                                    : 'rgba(244, 67, 54, 0.2)',
                                  color: pred.confidence >= 0.8
                                    ? '#4CAF50'
                                    : pred.confidence >= 0.6
                                    ? '#FF9800'
                                    : '#F44336',
                                  border: `1px solid ${pred.confidence >= 0.8
                                    ? '#4CAF50'
                                    : pred.confidence >= 0.6
                                    ? '#FF9800'
                                    : '#F44336'}`
                                }}
                              />
                            </Box>
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

      {/* Plant Selection Dialog */}
      <Dialog
        open={showPlantSelectionDialog}
        onClose={() => setShowPlantSelectionDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          pb: 1,
          background: 'linear-gradient(135deg, #4CAF50, #81C784)',
          color: 'white',
          borderRadius: '16px 16px 0 0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, flex: 1 }}>
              🌱 {t('selectPlantTitle')}
            </Typography>
            <IconButton
              onClick={() => setShowPlantSelectionDialog(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
            {t('selectPlantSubtitle')}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {plants.map((plant) => (
              <Grid item xs={6} sm={4} md={3} key={plant.id}>
                <Card
                  onClick={() => {
                    setSelectedPlant(plant.id);
                    setShowPlantSelectionDialog(false);
                    setResults(null);
                    setError('');
                  }}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid transparent',
                    borderRadius: 3,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      border: `2px solid ${plant.color}`,
                      boxShadow: `0 10px 30px ${plant.color}40`,
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 1,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${plant.color}20, ${plant.color}10)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${plant.color}30`,
                      }}
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          filter: `drop-shadow(2px 2px 4px ${plant.color}40)`,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: plant.color }}>
                      {plant.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setShowPlantSelectionDialog(false)}
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: 3,
              py: 1.5,
              borderColor: '#4CAF50',
              color: '#4CAF50',
              '&:hover': {
                borderColor: '#45a049',
                backgroundColor: 'rgba(76, 175, 80, 0.1)'
              }
            }}
          >
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default HomePage;
