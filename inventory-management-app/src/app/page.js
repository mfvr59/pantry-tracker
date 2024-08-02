'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import "./globals.css"; 


const emojis = ['🍎', '🍇', '🍓', '🍍', '🍌', '🥭', '🍒', '🍉', '🍑'];

export default function LandingPage() {
  const router = useRouter();
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);

  useEffect(() => {
    let emojiIndex = 0;
    const interval = setInterval(() => {
      emojiIndex = (emojiIndex + 1) % emojis.length;
      setCurrentEmoji(emojis[emojiIndex]);
    }, 500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        background: "linear-gradient(135deg, #e6edf2, #f9d2d2)", // Subtle red gradient
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Box
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "15px",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" component="div" gutterBottom sx={{ fontSize: '3rem' }}>
          {currentEmoji}
        </Typography>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ color: "#000000", fontFamily: "'Lato', Arial, sans-serif" }}
        >
          SnackTrack
        </Typography>
        <Typography 
          variant="body1" 
          color="textSecondary" 
          gutterBottom 
          sx={{ color: "#000000", fontFamily: "'Lato', Arial, sans-serif"}}
        >
          Track your snacks easily with SnackTrack!
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button 
            variant="contained" 
            sx={{ 
              borderRadius: '20px', 
              bgcolor: "#99181d", 
              color: "#ffffff", 
              fontFamily: "'Lato', Arial, sans-serif", 
              '&:hover': { bgcolor: "#db4d52" } 
            }}
            onClick={() => router.push('/tracker')}
          >
            Get Started
          </Button>
          <Button 
            variant="outlined" 
            sx={{ 
              borderRadius: '20px', 
              borderColor: "#99181d", 
              color: "#99181d", 
              fontFamily: "'Lato', Arial, sans-serif", 
              '&:hover': { 
                borderColor: "#db4d52", 
                color: "#db4d52" 
              } 
            }}
            onClick={() => router.push('https://www.mafer.dev/')}
          >
            Learn More
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          display: "flex",
          gap: 2,
        }}
      >
        <a href="https://github.com/mfvr59" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} style={{ color: '#333' }} />
        </a>
        <a href="https://instagram.com/mafeervelasquez" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} style={{ color: '#E4405F' }} />
        </a>
        <a href="https://www.linkedin.com/in/mariafernandavelasquez/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} style={{ color: '#0077B5' }} />
        </a>
      </Box>
    </Container>
  );
}
