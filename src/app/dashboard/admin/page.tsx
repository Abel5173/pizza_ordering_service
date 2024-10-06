"use client"

import * as React from 'react';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import { useSession } from 'next-auth/react';
import { Box, Typography } from '@mui/material';
import { redirect } from 'next/navigation';

export default function Page() {

  const { data: session, status } = useSession();

  console.log('Session from data:', session?.user);

  if (session?.user.role === 'CUSTOMER') {
    redirect('/{user.id}')
  }

  return (
    // <Box sx={{display: 'flex'}}>
      <Stack spacing={2} direction="row">
        <Badge badgeContent={4} color="secondary">
          <MailIcon color="action" />
        </Badge>
        <Typography sx={{color: 'black'}} variant="h6" component="div">
          Welcome {session?.user?.name}
        </Typography>
        <Typography
          sx={{color: 'black'}}
          variant="body2"
          component="div"
        >
          {session?.user?.email}
          {session?.user?.phone}
        </Typography>

        <Badge badgeContent={4} color="error">
          <MailIcon color="action" />
        </Badge>

        <Badge badgeContent={4} color="success">
          <MailIcon color="action" />
        </Badge>
      </Stack>
    // </Box>
  );
}

