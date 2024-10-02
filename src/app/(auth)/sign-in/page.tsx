import SignInForm from "@/components/form/signinform";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import pizza from '/public/pizza.svg';

function SignInPage() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'center',
      bottom: 0,
      width: '100%',
    }}>
      <Container disableGutters>
        <Box sx={{ 
          bgcolor: '#FF9921', 
          height: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
          }}>
          <Image
              src={pizza}
              alt="pizza"
              width={305}
              height={300}
            />
        </Box>
      </Container>
      <Container disableGutters>
        <Box sx={{ 
          bgcolor: '#fff', 
          height: '100vh', 
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // width: '100%'
          }} >
          <SignInForm />
        </Box>
      </Container>
    </Box>
  );
}

export default SignInPage;

