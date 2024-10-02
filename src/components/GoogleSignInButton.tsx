import { Button } from '@mui/material'
import { FC } from 'react'

interface GoogleSignInButtonProps {
    children: React.ReactNode
}

const loginWithGoogle = () => {
    console.log('Login with Google')
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({children}) => {
  return (
    <Button variant="contained" 
        sx={{
          backgroundColor: '#FF8100',
          width: '100%',
          marginBottom: '2rem',
          color: 'white',
          marginTop: '2rem',
          '&:hover': {
            backgroundColor: '#FF9900',
          },
        }}
    
    onClick={loginWithGoogle}>{children}</Button>
  )
}

export default GoogleSignInButton