import { Box } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box component='img' src='/assets/loader/loader.gif'></Box>
    </Box>
  );
};

export default Loader;
