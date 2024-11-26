//mui
import { Box, Container } from '@mui/material';
//react-router-dom
import { Outlet } from 'react-router-dom';
//component
import Header from '../../Components/header';
import Footer from '../../Components/footer';
//-------------------------------------------------

const AccountLayout = () => {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Container sx={{maxWidth: '90rem'}}>
        <Outlet />
      </Container>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default AccountLayout;
