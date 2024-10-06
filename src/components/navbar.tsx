'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Image from 'next/image';
import logo from '/public/logo.svg';
import Link from 'next/link';
import { Skeleton, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

const pages = ['Home', 'Orders', 'Who we are'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  
  const { data: session, status } = useSession();

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none'}} >
      <Container maxWidth="xl" sx={{
          backgroundColor: 'transparent',
          height: 'auto', // to contain the contents of the navbar we set the height to auto
          display: 'flex',
          width: '100%',
          justifyContent: 'space-evenly',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/">
            <Image
              src={logo}
              alt="logo"
              priority
              width={80}
              height={80}
            />
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', alignItems: 'center', flexGrow: 2 }}>
            {pages.map((page) => (
              <Link
                href="#"
                key={page}
              >
                <Typography variant="h1" gutterBottom component="div" sx={{ my: 2, color: '#514C48', textTransform: 'capitalize', fontSize: '1rem', display: 'block', fontWeight: 700,
                
                  '&:hover': {
                    color: '#ff7d00',
                    backgroundColor: 'transparent',
                  },
                  '&:active': {
                    color: '#ff7d00',
                  }
                 }}>
                  {page}
                </Typography>
              </Link>
            ))}
          </Box>

            {session?.user ? (
              <Box sx={{ display: 'flex', justifyContent: 'end',   flexGrow: 1 }}>
                {/* <Skeleton variant="rectangular" width={110} height={40} /> */}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'end',   flexGrow: 1 }}>
                <Button variant="contained" sx={{
                  backgroundColor: '#ff7d00',
                  color: 'white',
                  fontWeight: 900,
                  letterSpacing: '.1rem',
                  textTransform: 'capitalize',
                }}>
                  Register
                </Button>
              </Box>
            )}
          
      </Container>        
    </AppBar>
  );
}
export default NavBar;
