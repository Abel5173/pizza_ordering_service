import { Box, Divider, FormControl, Icon, IconButton, InputAdornment, InputBase, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image'
import leaf from '/public/l-leaf.svg'
import pizza1 from '/public/pizza1.svg'
import NavBar from '@/components/navbar'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

function page() {
  return (
    <Box sx={{ backgroundColor: '#FFF8F1' }}>
        <NavBar />
        <Box component="section" sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #FFFFFF, #FFC993, #FFF8F1)',            
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '1.5rem', padding: '1.5rem', flexGrow: '4', width: '30%'}}>
                <Typography
                    variant="h1"
                    align="left"
                    sx={{
                        fontSize: { xs: '2rem', md: '6rem' },
                        fontWeight: 700,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundImage: '-webkit-linear-gradient(#FF8100, #FFBE71)',
                    }}
                >
                Order Us
                </Typography>

                <Typography variant='body1' sx={{ color: '#050505'}}>
                    Craving a hot, cheesy pizza? Explore our wide variety of mouth-watering pizzas topped with fresh ingredients and delivered right to your door. Customize your pizza just the way you like it with our easy-to-use online ordering system, and track your order every step of the way. Whether you're a fan of classic Margherita or loaded Pepperoni, we’ve got something for everyone!
                </Typography>

                <Paper
                    component="form"
                    sx={{ m: '1', p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '125px' }}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <IconButton type="button" sx={{ p: '15px', backgroundColor: '#FF890F' }} aria-label="search">
                        <Icon  sx={{color: 'white'}}>
                            <SearchIcon />
                        </Icon>
                    </IconButton>
                </Paper>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: '1.5rem', flexGrow: '5'}}>
                <Image src={leaf} alt="leaf" width={100} height={100} />
                <Image src={pizza1} alt="leaf" width={600} height={450} />
            </Box>
        </Box>
    </Box>
  )
}

export default page