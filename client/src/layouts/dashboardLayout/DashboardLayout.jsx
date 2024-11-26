//mui
import { Box, Grid } from '@mui/material';
//react-router-dom
import { Outlet } from 'react-router-dom';
//component
import Banner from './banner';
import VideoHot from '../../section/dashboard/VideoHot';
import Header from '../../Components/header';
import Footer from '../../Components/footer';
//-------------------------------------------------

const DashboardLayout = () => {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Box>
        <Grid
          container
          sx={{
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
              xl: 'row',
              lg: 'row',
            },
          }}
        >
          <Grid
            item
            xl={3}
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                xl: 'block',
                lg: 'block',
              },
            }}
          >
            <Banner />
          </Grid>
          <Grid item xl={6} md={6} xs={12} sm={12}>
            <Outlet />
          </Grid>
          <Grid
            item
            xl={3}
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
                xl: 'block',
                lg: 'block',
              },
            }}
          >
            <VideoHot />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
