import { Typography } from "@mui/material";

export default function Error( { message }: { message: string } ) {
    return (
        <>
            <Typography sx={{
                color: 'red',
                fontSize: '0.9rem',
                textAlign: 'left',
            }}>
                {message}
            </Typography>
        </>
    )
}