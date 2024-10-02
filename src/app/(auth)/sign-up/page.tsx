import { Box, Container } from "@mui/material"
import Image from "next/image"
import pizza from '/public/pizza.svg'
import SignUpForm from "@/components/form/signupform"

function SignUp() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'black',
            color: 'white',
            // textAlign: 'center',
            // width: '100%',
            height: '100vh'
            }}
        >
            <Container  sx={{
                    height: '100%'
                }} 
                disableGutters>
                <Box sx={{ 
                    bgcolor: '#FF9921', 
                    height: '100%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    }}
                >
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
                    // paddingTop: '4rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                    }} >
                <SignUpForm />
                </Box>
            </Container>
        </Box>
    )
}

export default SignUp