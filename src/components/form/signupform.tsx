'use client'

import UploadFileIcon from '@mui/icons-material/UploadFile';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GoogleIcon from '@mui/icons-material/Google';
import React, { SetStateAction, useRef, useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Typography, Box, Stack, Divider, FormControlLabel, Checkbox, InputAdornment } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/logo.svg';
import GoogleSignInButton from '../GoogleSignInButton';
import InputField from './inputfield';
import { formSchema, FormSchema } from '@/utils/validation/registerform';
import ImageUpload from './imageupload';
import Error from './error';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();

  const [role, setRole] = useState<string>('CUSTOMER');

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { termsAndConditions: false },
  })

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = form;

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [ preview, setPreview ] = useState<string | null>(null); 

  // function to handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); 
        setValue('logo', file); // Set the file in the form
      }

      reader.readAsDataURL(file); // Read the file as data URL
    } else {
      setPreview(null); // Reset the preview
    }
  }

  const removeLogo = () => {
    setPreview(null); // Reset the preview
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = ''; // Reset the file input
    }

    setValue('logo', null); // Reset the file in the form
  }

  const triggerFileInput = () => hiddenFileInput.current?.click(); // This will trigger the file input, meaning the user will be able to select a file

  const onSubmitForm: SubmitHandler<FormSchema> = async (data) => {
    const form = new FormData();
    form.set('name', data.name);
    form.set('email', data.email);
    form.set('password', data.password);
    form.set('phone', data.phone);
    if (role === 'ADMIN') {
      form.set('restaurantName', data.restaurantName);
      form.set('restaurantLocation', data.restaurantLocation);
      form.set('logo', data.logo as File);
    }

    // console.log(data, role, form.getAll('logo'));
    const reaponse = await fetch('/api/user/create', {
      method: 'POST',
      body: form,
      headers: {
        // 'Content-Type': 'multipart/form-data',
      },
    })

    if (reaponse.ok) {
      router.push('/sign-in');
    } else {
      const error = await reaponse.json();
      console.error(error);
    }
  }

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    restaurantName: '',
    restaurantLocation: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setRole(e.target.value);
  };


  return (
    <Box sx={{
        width: '60%', 
        paddingTop: '4rem',
        '@media (min-width: 768px)': { 
            maxWidth: '600px',
        },
        '@media (min-width: 1024px)': {
            maxWidth: '800px',
        }
    }}>
        <Stack >{/* Logo */}
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
          <Typography 
              variant="h5" 
              sx={{
                  fontSize: { xs: '16px', md: '24px' }, // Responsive typography
                  textAlign: 'left', 
                  color: '#333',
              }}
          >
              Sign Up
          </Typography>

          {/* Divider */}
          <Divider sx={{ 
          borderColor: '#E0E0E0', // Soft color for divider
          opacity: 0.8,
          }}/>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <FormControl 
              size='small'
              sx={{
              display: 'flex',
              flexDirection: 'column',
              '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                  borderColor: '#D0D0D0', 
                  },
                  '&:hover fieldset': {
                  borderColor: '#FF8100', 
                  },
                  '&.Mui-focused fieldset': {
                  borderColor: '#FF8100', 
                  },
              },
              '& .MuiInputLabel-root': {
                  color: '#555', 
              },
              '& .Mui-focused': {
                  color: '#FF8100', 
              },
              }}
            >
            {/* Name Field */}
            <InputField 
              name="name"
              register={register} 
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={userData.name}
              required={true}
              onChange={handleInputChange}
            />
            {errors.name && (<Error message={errors.name.message?.toString() || ''} />)}

            {/* Email Field */}
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

            {/* Phone Field */}
            <InputField 
              name="phone"
              register={register}
              label="Phone"
              type="tel"
              placeholder="Enter your phone number"
              value={userData.phone}
              required={true}
              onChange={handleInputChange}
            />
            {errors.phone && (<Error message={errors.phone.message?.toString() || ''} />)}

            {/* Password Field */}
            <InputField 
              name="password"
              register={register}
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={userData.password}
              required={true}
              onChange={handleInputChange}
            />
            {errors.password && (<Error message={errors.password.message?.toString() || ''} />)}

            {/* Confirm Password */}
            <InputField
              register={register}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={userData.confirmPassword}
              required={true}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (<Error message={errors.confirmPassword.message?.toString() || ''} />)}

            {/* Role Selection */}
            <FormControl size='small' sx={{marginTop: '1rem', width: '100%' }}>
              <InputLabel id="role">Register as</InputLabel>
              <Select
                sx={{
                    textAlign: 'left',
                }}
                labelId="role"
                id="role"
                value={role}
                label="Register as"
                onChange={handleRoleChange}
              >
                <MenuItem dense value={"CUSTOMER"}>Customer</MenuItem>
                <MenuItem dense value={"ADMIN"}>Restaurant Manager</MenuItem>
              </Select>
            </FormControl>

            {/* Restaurant Fields (Only for Managers) */}
            {role === 'ADMIN' && (
            <>
                <InputField
                name="restaurantName"
                register={register}
                label="Restaurant Name"
                type="text"
                placeholder="Enter your restaurant name"
                value={userData.restaurantName}
                onChange={handleInputChange}
                required={true}
                />
                {errors.restaurantName && (<Error message={errors.restaurantName.message?.toString() || ''} />)}

                <InputField
                name="restaurantLocation"
                register={register}
                label="Restaurant Location"
                type="text"
                placeholder="Enter your restaurant location"
                value={userData.restaurantLocation}
                onChange={handleInputChange}
                required={true}
                />   
                {errors.restaurantLocation && (<Error message={errors.restaurantLocation.message?.toString() || ''} />)}

                {/* Upload Restaurant Image */}
                <ImageUpload
                preview={preview}
                triggerFileInput={triggerFileInput}
                removeImage={removeLogo}
                register={register}
                hiddenFileInputRef={hiddenFileInput}
                handleFileChange={handleFileInputChange} errors={{
                  logo: undefined
                }}
                required={true}
                />
                {errors.logo && (<Error message={errors.logo.message?.toString() || ''} />)}
            </>
            )}
            </FormControl>

            {/* terms and conditions */}
            <FormControlLabel sx={{
                color: '#000000DE',
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
            }} required 
            control={<Checkbox 
                {...register('termsAndConditions')}
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#FF8100',
                '&.Mui-checked': {
                color: '#FF8100',
                },
            }}/>} label="I accept the Terms and Conditions" />

            {/* Submit Button */}
            <Button type='submit'
                variant="contained" 
                sx={{
                backgroundColor: '#FF8100',
                margin: '0 2rem 0 0',
                width: '100%',
                color: 'white',
                //   marginTop: '2rem',
                '&:hover': {
                    backgroundColor: '#FF9900',
                },
                }}
            >
                Sign Up
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

          <GoogleSignInButton> <GoogleIcon 
          sx={{
          marginRight: '1.5rem',
          fontSize: '1.5rem',
          }} /> Sign Up With Google</GoogleSignInButton>

          {/* Signup Section */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ color: '#555', fontSize: '14px' }}>
              Already have an account?
          </Typography>
          <Typography 
              sx={{ 
              color: '#FF8100', 
              cursor: 'pointer',
              fontSize: '14px',
              marginLeft: '0.5rem',
              }}
          >
              <Link href="/sign-in" style={{ textDecoration: 'none', color: 'inherit' }}>
              Login
              </Link>
          </Typography>
          </Box>
        </Stack>
    </Box>
  );
};

export default SignUp;
