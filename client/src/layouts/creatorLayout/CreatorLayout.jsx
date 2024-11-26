//mui
import { Box, Grid } from '@mui/material';
//react-router-dom
import { Outlet } from 'react-router-dom';
//component
import Header from './header';
import SideBar from './sidebar';
//-------------------------------------------------

const CreatorLayout = () => {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Box>
        <Grid container>
            <Grid item md={2}>
                <SideBar/>
            </Grid>
            <Grid item md={10}>
                <Outlet />
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreatorLayout;
