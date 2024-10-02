import Facebook from "@mui/icons-material/Facebook"
import LinkedIn from "@mui/icons-material/LinkedIn"
import Twitter from "@mui/icons-material/Twitter"
import YouTube from "@mui/icons-material/YouTube"
import { Box, Typography } from "@mui/material"

function Footer() {
  return (
    <Box component="section"
    sx={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
        bottom: 0,
        width: '100%',
    }}
    >
        <Box sx={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Typography variant="caption">&copy; 2021 Pizza Ordering App</Typography>
            <Typography variant="caption">Terms & Conditions</Typography>
        </Box>

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
        }}>
            <Box sx={{
                backgroundColor: '#1f1f1f', 
                borderRadius: '50%', 
                height: '34px', 
                width:'34px',
                display: 'inline-flex', 
                justifyContent: 'center', 
                alignItems: 'center'
                }}>
                <Facebook fontSize="small"/>
            </Box>

            <Box sx={{
                backgroundColor: '#1f1f1f', 
                borderRadius: '50%', 
                height: '34px', 
                width:'34px',
                display: 'inline-flex', 
                justifyContent: 'center', 
                alignItems: 'center'
                }}>
                <LinkedIn fontSize="small" />
            </Box>

            <Box sx={{
                backgroundColor: '#1f1f1f', 
                borderRadius: '50%', 
                height: '34px', 
                width:'34px',
                display: 'inline-flex', 
                justifyContent: 'center', 
                alignItems: 'center'
                }}>
                <Twitter fontSize="small" />
            </Box>

            <Box sx={{
                backgroundColor: '#1f1f1f', 
                borderRadius: '50%', 
                height: '34px', 
                width:'34px',
                display: 'inline-flex', 
                justifyContent: 'center', 
                alignItems: 'center'
                }}>
                <YouTube fontSize="small" />
            </Box>
        </Box>
    </Box>
  )
}

export default Footer