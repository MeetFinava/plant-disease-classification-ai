import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

function LoadingScreen() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 50%, #A5D6A7 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      {/* Main logo container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          {/* Logo SVG */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              width: 120,
              height: 120,
            }}
          >
            <CircularProgress
              size={120}
              thickness={2}
              sx={{
                color: 'rgba(255, 255, 255, 0.3)',
                position: 'absolute',
              }}
            />
          </motion.div>

          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Box
              component="img"
              src="/logo.svg"
              alt="PlantCare AI Logo"
              sx={{
                width: 100,
                height: 100,
                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))',
              }}
            />
          </motion.div>
        </Box>
      </motion.div>

      {/* App title */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontWeight: 700,
            textAlign: 'center',
            mb: 1,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          🌱 PlantCare AI
        </Typography>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            mb: 4,
            fontWeight: 400,
            textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
          }}
        >
          AI-Powered Plant Disease Detection
        </Typography>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress
            size={24}
            sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
          />
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
            }}
          >
            Loading...
          </Typography>
        </Box>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            left: `${20 + index * 12}%`,
            top: `${30 + (index % 2) * 40}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }
      `}</style>
    </Box>
  );
}

export default LoadingScreen;
