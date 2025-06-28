import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon,
  BugReport as BugReportIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

function ImageUpload({ onImageUpload, onAnalyze, loading, hasImage }) {
  const { t } = useTranslation();
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    setError('');
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Pass file to parent
    onImageUpload(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom textAlign="center" color="white">
        {t('uploadImage')}
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}
      >
        {!preview ? (
          <Box
            className={`upload-area ${dragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 4,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(76, 175, 80, 0.05)',
              },
              ...(dragOver && {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
              })
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {t('dragDrop')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Supports: JPG, PNG, GIF (max 10MB)
            </Typography>
            <Button
              variant="outlined"
              startIcon={<PhotoCameraIcon />}
              onClick={(e) => {
                e.stopPropagation();
                handleUploadClick();
              }}
            >
              Choose File
            </Button>
          </Box>
        ) : (
          <Box>
            <Box sx={{ mb: 2 }}>
              <img
                src={preview}
                alt="Preview"
                className="preview-image"
                style={{
                  maxWidth: '100%',
                  maxHeight: 300,
                  borderRadius: 8,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                onClick={handleUploadClick}
                startIcon={<PhotoCameraIcon />}
              >
                Change Image
              </Button>
              <Button
                variant="contained"
                onClick={onAnalyze}
                disabled={loading || !hasImage}
                startIcon={loading ? <CircularProgress size={20} /> : <BugReportIcon />}
                sx={{ minWidth: 140 }}
              >
                {loading ? t('processing') : t('analyzeButton')}
              </Button>
            </Box>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </Paper>
    </Box>
  );
}

export default ImageUpload;
