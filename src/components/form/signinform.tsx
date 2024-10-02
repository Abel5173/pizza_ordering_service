"use client"

import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Divider, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import logo from '/public/logo.svg'
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Error from './error';
import InputField from './inputfield';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must have than 6 characters'),
});

function SignInForm() {

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = form;

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    console.log(values);
    if (signInData?.error) {
      console.log(signInData?.error)
    } else {
      const role = sessionStorage.getItem('role');
      if (role === 'CUSTOMER') {
        router.refresh();
        router.push('/');
      }
      router.refresh();
      router.push('/admin');
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box sx={{
        margin: '0 auto', 
        width: '60%', 
        '@media (min-width: 768px)': {
        maxWidth: '600px',
        },
        '@media (min-width: 1024px)': {
        maxWidth: '800px',
        }
      }}
    >
      <Stack >
        
        {/* Logo */}
        <Box sx={{ textAlign: 'left' }}>
          <Image
            src={logo}
            alt="logo"
            priority
            width={130}
            height={50}
            style={{ marginBottom: '1rem' }}
          />
        </Box>

        {/* Title */}
        <Typography 
          variant="h5" 
          sx={{
            fontSize: { xs: '16px', md: '24px' }, // Responsive typography
            textAlign: 'left', 
            color: '#333',
          }}
        >
          Login
        </Typography>

        {/* Divider */}
        <Divider sx={{ 
          borderColor: '#E0E0E0',
          opacity: 0.8,
        }}/>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormControl 
            size='small'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              margin: '2rem 0.5rem 0 0',
              gap: '1.5rem',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#D0D0D0', // Lighter border by default
                },
                '&:hover fieldset': {
                  borderColor: '#FF8100', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF8100', // Border color when focused
                },
              },
              '& .MuiInputLabel-root': {
                color: '#555', // Default label color
              },
              '& .Mui-focused': {
                color: '#FF8100', // Label color when focused
              },
            }}
          >
            <InputField
              name="email"
              register={register}
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={userData.email}
              required={true}
              onChange={handleInputChange}
            />
            {errors.email && (<Error message={errors.email.message?.toString() || ''} />)}

            <FormControl variant="outlined" fullWidth size='small'>
              <InputLabel htmlFor="password" size='small'>Password</InputLabel>
              <OutlinedInput
                {...register('password')}
                required
                size='small'
                id="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                    size='small'
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            {errors.password && (<Error message={errors.password.message?.toString() || ''} />)}

            </FormControl>
          </FormControl>

          {/* Submit Button */}
          <Button 
            type="submit"
            variant="contained" 
            sx={{
              backgroundColor: '#FF8100',
              margin: '0 2rem 0 0',
              width: '100%',
              color: 'white',
              marginTop: '2rem',
              '&:hover': {
                backgroundColor: '#FF9900',
              },
            }}
          >
            Login
          </Button>
        </form>

        {/* Divider with OR */}
        <Divider 
          sx={{ 
            color: '#888', 
            fontSize: '14px',
            marginTop: '2rem',
          }}
        >or</Divider>

        {/* Google Sign In */}
        <GoogleSignInButton><GoogleIcon sx={{
          marginRight: '0.5rem',
          fontSize: '1.5rem',
        }} /> Sign In With Google</GoogleSignInButton>

        {/* Signup Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ color: '#555', fontSize: '14px' }}>
            Don’t have an account?
          </Typography>
          <Typography 
            sx={{ 
              color: '#FF8100', 
              cursor: 'pointer',
              fontSize: '14px',
              marginLeft: '0.5rem',
            }}
          >
            <Link href="/sign-up" style={{ textDecoration: 'none', color: 'inherit' }}>
              Sign up
            </Link>
          </Typography>
        </Box>

      </Stack>
    </Box>

  )
}

export default SignInForm