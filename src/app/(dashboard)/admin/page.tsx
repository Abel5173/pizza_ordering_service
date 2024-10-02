"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import { getSession, signOut, useSession } from 'next-auth/react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { redirect } from 'next/navigation';

export default async function OutlinedCard() {

  const session = await getSession();
  // const user = session?.user as any;

  console.log('Session data:', session?.user);


  return (

    <Box sx={{ }}>
      <Card variant="outlined" sx={{
        width: '50%',
        height: '50%',
        marginTop: '5rem',
        padding: '2rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            benevolent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
      <button onClick={() => {
        signOut()
        redirect('/sign-in')
        }}>Sign out</button>
    </Box>
  );
}