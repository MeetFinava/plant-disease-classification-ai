import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert,
  Grid
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

function ResultsDisplay({ results }) {
  const { t } = useTranslation();

  if (results?.error) {
    return (
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Alert severity="error" icon={<ErrorIcon />}>
          {results.error}
        </Alert>
      </Paper>
    );
  }

  if (!results?.prediction) {
    return null;
  }

  const { prediction, top_predictions } = results;

  const getHealthIcon = (disease) => {
    if (disease.toLowerCase().includes('healthy')) {
      return <CheckCircleIcon sx={{ color: 'success.main' }} />;
    }
    return <WarningIcon sx={{ color: 'warning.main' }} />;
  };

  const getHealthColor = (disease) => {
    if (disease.toLowerCase().includes('healthy')) {
      return 'success';
    }
    return 'warning';
  };

  const formatConfidence = (confidence) => {
    return Math.round(confidence * 100);
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom textAlign="center" color="white">
        {t('results')}
      </Typography>

      {/* Main Prediction */}
      <Paper
        elevation={6}
        sx={{
          p: 3,
          mb: 3,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {getHealthIcon(prediction.disease)}
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
            Primary Detection
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {t('plant')}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {prediction.plant}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {t('disease')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {prediction.disease}
                </Typography>
                <Chip
                  label={prediction.disease.toLowerCase().includes('healthy') ? t('healthy') : 'Disease'}
                  color={getHealthColor(prediction.disease)}
                  size="small"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {t('confidence')}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatConfidence(prediction.confidence)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={formatConfidence(prediction.confidence)}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: prediction.disease.toLowerCase().includes('healthy')
                  ? 'linear-gradient(90deg, #4caf50, #8bc34a)'
                  : 'linear-gradient(90deg, #ff9800, #f57c00)',
              },
            }}
          />
        </Box>
      </Paper>

      {/* Top Predictions */}
      {top_predictions && top_predictions.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {t('topPredictions')}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {top_predictions.map((pred, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        #{index + 1}
                      </Typography>
                      <Typography variant="body1">
                        {pred.plant} - {pred.disease}
                      </Typography>
                      {getHealthIcon(pred.disease)}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatConfidence(pred.confidence)}%
                    </Typography>
                  </Box>
                  
                  <LinearProgress
                    variant="determinate"
                    value={formatConfidence(pred.confidence)}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 2,
                        background: pred.disease.toLowerCase().includes('healthy')
                          ? 'linear-gradient(90deg, #4caf50, #8bc34a)'
                          : 'linear-gradient(90deg, #ff9800, #f57c00)',
                      },
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default ResultsDisplay;
