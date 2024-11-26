//mui
import { Box, Container } from '@mui/material';
//react-router-dom
import { Outlet } from 'react-router-dom';
//component
import Header from '../../Components/header';
//--------------------------------------------------------------

const VideoLayout = () => {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Container maxWidth="xl">
        <Box>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default VideoLayout;
