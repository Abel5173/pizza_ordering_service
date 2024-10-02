import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import NavBar from '@/components/navbar';
import Footer from '@/components/footer';

export default function FixedContainer() {
  return (
    <>
      <NavBar />
      <Box component="section" sx={{ 
          background: 'linear-gradient(to bottom, #FFFFFF, #FFC993, #FFF8F1)', 
          color: 'white', 
          textAlign: 'center', 
          padding: '1rem', 
          bottom: 0, 
          width: '100%',
          height: '100vh',
         }}
        >
          <Typography>
            Order Us
          </Typography>
      </Box>
      <Footer />
    </>
  );
}
