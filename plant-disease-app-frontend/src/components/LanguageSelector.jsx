import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  Chip
} from '@mui/material';
import {
  Language as LanguageIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = ({ variant = 'button' }) => {
  const { currentLanguage, changeLanguage, getAvailableLanguages, getCurrentLanguageInfo, t } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (languageCode) => {
    changeLanguage(languageCode);
    handleClose();
  };

  const currentLang = getCurrentLanguageInfo();
  const availableLanguages = getAvailableLanguages();

  if (variant === 'chip') {
    return (
      <>
        <Chip
          icon={<LanguageIcon />}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '0.8rem', opacity: 0.9 }}>
                {t('language')}:
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                {currentLang.flag}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {currentLang.name}
              </Typography>
            </Box>
          }
          onClick={handleClick}
          sx={{
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(129, 199, 132, 0.1))',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(76, 175, 80, 0.3)',
            color: 'white',
            minHeight: 40,
            px: 1,
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.3), rgba(129, 199, 132, 0.2))',
              border: '2px solid rgba(76, 175, 80, 0.5)',
              transform: 'scale(1.02)',
            },
            '& .MuiChip-icon': {
              color: 'white'
            },
            transition: 'all 0.3s ease'
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(76, 175, 80, 0.2)',
              borderRadius: 3,
              mt: 1,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          {availableLanguages.map((language) => (
            <MenuItem
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              selected={language.code === currentLanguage}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 1.5,
                px: 2,
                minHeight: 48,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(76, 175, 80, 0.15)',
                  borderLeft: '4px solid #4CAF50',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  }
                },
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                }
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '1.4rem' }}>
                {language.flag}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: language.code === currentLanguage ? 700 : 500,
                    color: language.code === currentLanguage ? '#4CAF50' : 'text.primary'
                  }}
                >
                  {language.name}
                </Typography>
                {language.code === currentLanguage && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#4CAF50',
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}
                  >
                    ✓ {t('language') === 'Language' ? 'Selected' :
                        t('language') === 'Idioma' ? 'Seleccionado' :
                        t('language') === 'Langue' ? 'Sélectionné' : 'चयनित'}
                  </Typography>
                )}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        endIcon={<ExpandMoreIcon />}
        variant="outlined"
        sx={{
          color: 'white',
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(129, 199, 132, 0.1))',
          backdropFilter: 'blur(15px)',
          border: '2px solid rgba(76, 175, 80, 0.4)',
          borderRadius: 3,
          px: 3,
          py: 1.5,
          minHeight: 48,
          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.25), rgba(129, 199, 132, 0.15))',
            border: '2px solid rgba(76, 175, 80, 0.6)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
          },
          transition: 'all 0.3s ease'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="body2" sx={{ fontSize: '0.85rem', opacity: 0.9, fontWeight: 500 }}>
            {t('language')}:
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Typography variant="body1" sx={{ fontSize: '1.3rem' }}>
              {currentLang.flag}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
              {currentLang.name}
            </Typography>
          </Box>
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(76, 175, 80, 0.2)',
            borderRadius: 3,
            mt: 1,
            minWidth: 220,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        {availableLanguages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageSelect(language.code)}
            selected={language.code === currentLanguage}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1.5,
              px: 2,
              minHeight: 48,
              '&.Mui-selected': {
                backgroundColor: 'rgba(76, 175, 80, 0.15)',
                borderLeft: '4px solid #4CAF50',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                }
              },
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.05)',
              }
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1.4rem' }}>
              {language.flag}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: language.code === currentLanguage ? 700 : 500,
                  color: language.code === currentLanguage ? '#4CAF50' : 'text.primary'
                }}
              >
                {language.name}
              </Typography>
              {language.code === currentLanguage && (
                <Typography
                  variant="caption"
                  sx={{
                    color: '#4CAF50',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}
                >
                  ✓ {t('selected')}
                </Typography>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
