import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MapLoadingSpinner = ({text}) => {
    return(
        <Box sx={{ position: 'relative', display: 'inline-flex', paddingTop: "10vh" }}>
            <CircularProgress size={"100px"} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Typography variant="caption" component="div" color="text.secondary">
                    {text}
                </Typography>
            </Box>
        </Box>
    )
}

export default MapLoadingSpinner