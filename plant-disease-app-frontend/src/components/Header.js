import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Language as LanguageIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const navigationItems = [
    { path: '/', label: t('nav.home') || 'Home', icon: <HomeIcon /> },
    { path: '/plant-info', label: t('nav.plantInfo') || 'Plant Info', icon: <InfoIcon /> },
    { path: '/contact', label: t('nav.contact') || 'Contact', icon: <ContactIcon /> }
  ];

  const handleLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    handleLanguageClose();
  };

  const handleMobileMenuClick = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(76, 175, 80, 0.1)',
        color: theme.palette.primary.main,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo/Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Box
              component="img"
              src="/logo.svg"
              alt="PlantCare AI Logo"
              sx={{
                width: 40,
                height: 40,
                filter: 'drop-shadow(0 2px 8px rgba(76, 175, 80, 0.3))',
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'none',
              }}
            >
              PlantCare AI
            </Typography>
          </Box>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  backgroundColor: location.pathname === item.path ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                  borderRadius: 3,
                  px: 2,
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Language Selector & Mobile Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={handleLanguageClick}
            sx={{
              color: 'primary.main',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <LanguageIcon />
          </IconButton>

          {isMobile && (
            <IconButton
              onClick={handleMobileMenuClick}
              sx={{
                color: 'primary.main',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {/* Language Menu */}
        <Menu
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={handleLanguageClose}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 2,
              border: '1px solid rgba(76, 175, 80, 0.2)',
              mt: 1,
            },
          }}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              selected={i18n.language === lang.code}
              sx={{
                gap: 1,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                },
              }}
            >
              <span>{lang.flag}</span>
              {lang.name}
            </MenuItem>
          ))}
        </Menu>

        {/* Mobile Navigation Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 2,
              border: '1px solid rgba(76, 175, 80, 0.2)',
              mt: 1,
              minWidth: 200,
            },
          }}
        >
          {navigationItems.map((item) => (
            <MenuItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleMobileMenuClose}
              selected={location.pathname === item.path}
              sx={{
                gap: 1,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                },
              }}
            >
              {item.icon}
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
